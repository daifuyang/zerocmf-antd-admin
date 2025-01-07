import { addRole, getRole, updateRole } from '@/services/ant-design-pro/roles';
import { Role } from '@/typings/role';
import { ModalForm, ProForm, ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { App, Checkbox, Col, Form, Row, Tree } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { getMenus } from '@/services/ant-design-pro/menus';

declare interface Props {
  title: string;
  children: any;
  initialValues?: Partial<any>;
  readOnly?: boolean;
  onOk?: () => void;
}

// 递归获取所有 id
const getAllIds = (nodes: any[]): number[] => {
  return _.flatMap(nodes, (node) => [
    node.menuId,
    ...(node.children ? getAllIds(node.children) : [])
  ]);
};

const SaveForm = (props: Props) => {
  const [form] = Form.useForm<Role>();
  const { message } = App.useApp();
  const { title, children, initialValues = { status: 1 }, readOnly = false, onOk } = props;

  const [open, setOpen] = useState(false);
  const [menus, setMenus] = useState<any[]>([]);

  const [expandOpen, setExpandOpen] = useState(false); // 展开收起
  const [checkAllOpen, setCheckAllOpen] = useState(false); // 全选反选
  const [checkStrictlyOpen, setCheckStrictlyOpen] = useState(false); // 父子联动

  const [defaultKeys, setDefaultKeys] = useState<any[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
  const [treeCheckedKeys, setTreeCheckedKeys] = useState<any>();

  const fetchData = useCallback(
    async (roleId: number) => {
      try {
        const res = await getRole({ roleId });
        if (res.code === 1) {
          form.setFieldsValue(res.data as Role);
          if (res.data?.menuIds) {
            setTreeCheckedKeys({ checked: res.data.menuIds });
          }
        }
      } catch (error) {
        message.error('请求失败');
      }
    },
    [message, form],
  );

  // 获取菜单
  const fetchMenus = useCallback(async () => {
    try {
      const res = await getMenus();
      if (res.code === 1) {
        setMenus(res.data);
        const ids = getAllIds(res.data);
        setDefaultKeys(ids);
      }
    } catch (error) {
      message.error('请求失败');
    }

  }, [message])

  useEffect(() => {
    if (open) {
      fetchMenus();
      const { roleId } = initialValues || {};
      if (roleId) {
        fetchData(roleId);
      }
    }
  }, [open, initialValues]);

  const init = () => {
    setExpandOpen(false);
    setExpandedKeys([]);
    setCheckAllOpen(false);
    setTreeCheckedKeys(undefined);
    setCheckStrictlyOpen(false);
  }

  return (
    <ModalForm<Role>
      title={title}
      trigger={children}
      form={form}
      open={open}
      onOpenChange={(open) => setOpen(open)}
      autoFocusFirstInput
      width={520}
      initialValues={initialValues}
      modalProps={{
        centered: true,
        destroyOnClose: true,
        onCancel: () => {
          init();
        },
      }}
      onFinish={async (values) => {
        const menuIds = treeCheckedKeys?.checked || treeCheckedKeys || [];
        values.menuIds = menuIds;
        if (readOnly) {
          return true;
        }

        let res: any;
        const { roleId } = values || {};
        if (roleId) {
          res = await updateRole({ roleId }, values);
        } else {
          res = await addRole(values);
        }
        if (res.code === 1) {
          if (onOk) {
            onOk();
            init();
          }
          message.success(res.msg);
          return true;
        }
        message.error(res.msg);
        return false;
      }}
    >
      <ProFormText name="roleId" label="roleId" hidden></ProFormText>
      <ProFormText
        name="name"
        label="角色名称"
        placeholder="请输入角色名称"
        fieldProps={{ readOnly }}
      />
      <ProFormText
        name="description"
        label="角色描述"
        placeholder="请输入角色描述"
        fieldProps={{ readOnly }}
      />
      <ProFormDigit
        name="sortOrder"
        label="排序"
        fieldProps={{ precision: 0, readOnly }}
        placeholder="请输入排序"
      />

      {readOnly ? (
        <ProFormText
          label="状态"
          fieldProps={{
            readOnly: true,
            value: initialValues?.status === 1 ? '启用' : '禁用',
          }}
        />
      ) : (
        <ProFormRadio.Group
          name="status"
          label="状态"
          options={[
            {
              label: '启用',
              value: 1,
            },
            {
              label: '禁用',
              value: 0,
            },
          ]}
        />
      )}

      <ProForm.Item label="菜单权限">

        <div style={{ marginBottom: 10 }}>
          <Row>
            <Col span={8}>
              <Checkbox onChange={(e) => {
                const { checked } = e.target;
                setExpandOpen(checked);
                setExpandedKeys(checked ? defaultKeys : []);
              }} checked={expandOpen}>展开/收起</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox onChange={(e) => {
                const { checked } = e.target;
                setCheckAllOpen(checked);
                setTreeCheckedKeys(checked ? defaultKeys : []);
              }} checked={checkAllOpen}>全选/取消</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox onChange={(e) => {
                const { checked } = e.target;
                setCheckStrictlyOpen(checked);
              }} checked={checkStrictlyOpen}>父子联动</Checkbox>
            </Col>
          </Row>
        </div>

        <Tree
          height={260}
          checkable
          checkStrictly={!checkStrictlyOpen}
          expandedKeys={expandedKeys}
          checkedKeys={treeCheckedKeys}
          selectable={false}
          blockNode
          fieldNames={{ title: 'menuName', key: 'menuId' }}
          treeData={menus}
          onExpand={(expandedKeys) => {
            setExpandedKeys(expandedKeys);
          }}
          onCheck={(checkedKeys) => {
            setTreeCheckedKeys(checkedKeys);
          }}
        />
      </ProForm.Item>

    </ModalForm>
  );
};

export default SaveForm;
