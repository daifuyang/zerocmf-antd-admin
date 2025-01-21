import {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { App, Form, Space, Tag } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { addMenu, getMenu, getMenus, updateMenu } from '@/services/ant-design-pro/menus';
import { getApis } from '@/services/ant-design-pro/apis';

declare interface Props {
  title: string;
  children: any;
  initialValues?: Partial<any>;
  readOnly?: boolean;
  onOk?: () => void;
}

const menuTypeOptions = [
  '目录', '菜单', '按钮'
]

const tagColor: any = {
  'get': '#61affe',
  'post': '#49cc90',
  'put': '#fca130',
  'delete': '#f93e3e'
}

function treeToMap(tree: any[]) {
  return _.reduce(tree, (map, node) => {
    // 将当前节点的 id 和节点对象加入 Map
    map.set(node.menuId, node);

    // 如果有子节点，则递归调用
    if (node.children && node.children.length > 0) {
      treeToMap(node.children).forEach((value, key) => {
        map.set(key, value);
      });
    }

    return map;
  }, new Map());
}

const MenuForm = (props: Props) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [menuMap, setMenuMap] = useState<any>();
  const [apiMap, setApiMap] = useState<any>();

  const { title, children, initialValues = {}, readOnly = false, onOk } = props;

  if (initialValues?.parentId === undefined) {
    initialValues.parentId = 0;
  }

  if (initialValues?.menuType === undefined) {
    initialValues.menuType = 0;
  }

  if (initialValues?.isFrame === undefined) {
    initialValues.isFrame = 1;
  }

  if (initialValues?.visible === undefined) {
    initialValues.visible = 1;
  }

  if (initialValues?.status === undefined) {
    initialValues.status = 1;
  }

  const fetchData = useCallback(
    async (menuId: number) => {
      try {
        const res = await getMenu({ menuId });
        if (res.code === 1) {
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        message.error('请求失败');
      }
    },
    [open, message, form],
  );

  const fetchMenus = useCallback(async () => {
    const res = await getMenus();
    if (res.code === 1) {
      const options = res.data;
      return [
        {
          menuName: '顶级菜单',
          menuId: 0,
        }
        , ...options]

    }
    return [{
      menuName: '顶级菜单',
      menuId: 0,
    }];
  }, []);

  useEffect(() => {
    if (open && initialValues?.menuId) {
      fetchData(initialValues.menuId);
    }
  }, [open, initialValues]);

  const initMenus = async () => {
    const menus = await fetchMenus();
    const map = treeToMap(menus);
    setMenuMap(map);
  }

  const fetchApis = useCallback(async () => {
    const res = await getApis();
    if (res.code === 1) {
      const { data = [] } = res;
      if (data instanceof Array) {
        const obj = _.keyBy(data, 'id');
        setApiMap(obj);
      }
      return data;
    }
    return [];
  }, []);

  useEffect(() => {
    if (open && readOnly) {
      initMenus();
    }
  }, [open, readOnly])

  return (
    <ModalForm
      title={title}
      trigger={children}
      form={form}
      open={open}
      grid={true}
      rowProps={{
        gutter: 16,
      }}
      colProps={{
        span: 12,
      }}
      onOpenChange={(open) => setOpen(open)}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => { },
        className: 'next-modal',
      }}
      onFinish={async (values) => {

        /* console.log(values);

        const apis = values.apis?.map((id: number) => (
          apiMap[id]
        ))

        values.apis = apis; */

        let res: any;
        const { menuId } = values || {};
        if (menuId) {
          res = await updateMenu({ menuId }, values);
        } else {
          res = await addMenu(values);
        }
        if (res.code === 1) {
          if (onOk) {
            onOk();
          }
          message.success(res.msg);
          return true;
        }
        message.error(res.msg);
        return false;
      }}
    >
      <ProFormText colProps={{ span: 0 }} name="menuId" label="id" hidden />

      {
        readOnly ? <ProFormText colProps={{
          span: 24,
        }} label="上级菜单" fieldProps={{
          readOnly,
          value: menuMap?.get(initialValues.parentId)?.menuName
        }} /> : <ProFormTreeSelect
          name="parentId"
          label="上级菜单"
          colProps={{
            span: 24,
          }}
          initialValue={0}
          request={fetchMenus}
          placeholder="请选择上级菜单"
          fieldProps={{
            fieldNames: {
              label: 'menuName',
              value: 'menuId',
            }
          }}
        />
      }

      {
        readOnly ? <ProFormText label="菜单类型" fieldProps={{
          readOnly,
          value: menuTypeOptions[initialValues.menuType]
        }} /> : <ProFormRadio.Group
          name="menuType"
          label="菜单类型"
          options={[
            { label: '目录', value: 0 },
            { label: '菜单', value: 1 },
            { label: '按钮', value: 2 },
          ]}
        />
      }

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType !== 1) {
            return (
              <ProFormText
                name="icon"
                label="菜单图标"
                colProps={{
                  span: 24,
                }}
                placeholder={
                  readOnly ? '未填写' : '请输入菜单图标'
                }
                fieldProps={{
                  readOnly,
                }}
              />
            );
          }
        }}
      </ProFormDependency>
      <ProFormText
        name="menuName"
        label="菜单名称"
        placeholder={
          readOnly ? '未填写' : '请输入菜单名称'
        }
        rules={[{ required: true, message: '请输入菜单名称' }]}
        fieldProps={{
          readOnly,
        }}
      />

      <ProFormDigit name="sortOrder" label="显示排序" placeholder={
        readOnly ? '未填写' : '请输入显示排序'
      }
        fieldProps={{
          readOnly,
        }}
      />

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType !== 1) {
            return (
              <>
                {
                  readOnly ? <ProFormText label="是否外链" fieldProps={{
                    readOnly,
                    value: initialValues.isFrame === 1 ? '是' : '否'
                  }} /> : <ProFormRadio.Group
                    name="isFrame"
                    label="是否外链"
                    options={[
                      { label: '是', value: 1 },
                      { label: '否', value: 0 },
                    ]}
                    rules={[{ required: true, message: '请选择是否外链' }]}
                  />
                }

                <ProFormText name="path" label="路由地址" placeholder="请输入路由地址" fieldProps={{ readOnly }} />
              </>
            );
          }
        }}
      </ProFormDependency>

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType === 2) {
            return (
              <ProFormText name="component" label="组件路径" placeholder="请输入组件路径" fieldProps={{ readOnly }} />
            );
          }
        }}
      </ProFormDependency>

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType !== 0) {
            return <ProFormText name="perms" label="权限字符" placeholder="请输入权限字符" fieldProps={{ readOnly }} />;
          }
        }}
      </ProFormDependency>

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType === 2) {
            return (
              <>
                <ProFormText name="query" label="路由参数" placeholder="请输入路由参数" fieldProps={{ readOnly }} />
                {
                  readOnly ? <ProFormText label="是否缓存" fieldProps={{
                    readOnly,
                    value: initialValues.isCache === 1 ? '是' : '否'
                  }} /> : <ProFormRadio.Group
                    name="isCache"
                    label="是否缓存"
                    options={[
                      { label: '是', value: 1 },
                      { label: '否', value: 0 },
                    ]}
                    rules={[{ required: true, message: '请选择是否缓存' }]}
                  />
                }
              </>
            );
          }
        }}
      </ProFormDependency>

      {
        readOnly ? <ProFormText label="菜单状态" fieldProps={{
          readOnly,
          value: initialValues.visible === 1 ? '显示' : '隐藏'
        }} /> : <ProFormRadio.Group
          name="visible"
          label="显示状态"
          options={[
            { label: '显示', value: 1 },
            { label: '隐藏', value: 0 },
          ]}
          rules={[{ required: true, message: '请选择显示状态' }]}
        />

      }

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType !== 1) {
            return readOnly ? <ProFormText label="菜单状态" fieldProps={{
              readOnly,
              value: initialValues.status === 1 ? '启用' : '禁用'
            }} /> : <ProFormRadio.Group
              name="status"
              label="菜单状态"
              options={[
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
              ]}
              rules={[{ required: true, message: '请选择菜单状态' }]}
            />
          }
        }}
      </ProFormDependency>

      <ProFormSelect colProps={{
        span: 24,
      }} name="apis" label="绑定API" request={fetchApis} fieldProps={{
        maxTagCount: 7,
        mode: 'multiple',
        optionRender: (option) => {
          const { method } = option.data;
          return (
            <Space>
              <Tag style={{ width: 60, textAlign: 'center' }} color={tagColor[method]}>{method}</Tag>

              {option.data.path}
            </Space>
          )
        },
        tagRender: (props) => {
          const { label, value, closable, onClose } = props;
          const { method } = apiMap?.[value] || {};
          const color = tagColor[method];
          const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
          };
          return (
            <Tag
              color={color}
              onMouseDown={onPreventMouseDown}
              closable={closable}
              onClose={onClose}
            >
              {label}
            </Tag>
          );
        },
        fieldNames: {
          label: 'path',
          value: 'id',
        }
      }} />


    </ModalForm>
  );
};

export default MenuForm;
