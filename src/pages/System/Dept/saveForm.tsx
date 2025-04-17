import { createDept, getDept, updateDept, getDeptTree } from '@/services/ant-design-pro/depts';

import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { App, Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';

declare interface Props {
  title: string;
  children: any;
  initialValues?: Partial<any>;
  readOnly?: boolean;
  onOk?: () => void;
}

const SaveForm = (props: Props) => {
  const [form] = Form.useForm<API.Dept>();
  const { message } = App.useApp();
  const {
    title,
    children,
    initialValues = { status: 1, parentId: 0 },
    readOnly = false,
    onOk,
  } = props;

  const [open, setOpen] = useState(false);

  const fetchData = useCallback(
    async (deptId: number) => {
      try {
        const res = await getDept({ deptId });
        if (res.code === 1) {
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        message.error('请求失败');
      }
    },
    [message, form],
  );

  // 获取部门树
  const fetchDeptTree = useCallback(async () => {
    try {
      const res = await getDeptTree({});
      if (res.code === 1) {
        return [
          {
            deptName: '顶级部门',
            deptId: 0,
          },
          ...(res.data || []),
        ];
      }
      return [
        {
          deptName: '顶级部门',
          deptId: 0,
        },
      ];
    } catch (error) {
      message.error('获取部门树失败');
      return [
        {
          deptName: '顶级部门',
          deptId: 0,
        },
      ];
    }
  }, []);

  useEffect(() => {
    if (open) {
      // 只在表单打开时获取部门数据，不需要在这里处理返回结果
      // 因为ProFormTreeSelect组件的request属性会自动处理
      if (initialValues?.deptId) {
        fetchData(initialValues.deptId);
      }
    }
  }, [open, initialValues, fetchData]);

  return (
    <ModalForm<API.Dept>
      title={title}
      trigger={children}
      form={form}
      open={open}
      onOpenChange={(open) => setOpen(open)}
      autoFocusFirstInput
      width={520}
      readonly={readOnly}
      initialValues={initialValues}
      modalProps={{
        className: 'zerocmf-modal',
        centered: true,
        destroyOnClose: true,
        onCancel: () => {},
      }}
      onFinish={async (values) => {
        if (readOnly) {
          return true;
        }
        let res;
        const { deptId } = values;
        if (deptId) {
          res = await updateDept({ deptId }, values);
        } else {
          res = await createDept(values);
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
      <ProFormText name="deptId" label="deptId" hidden />

      <ProFormTreeSelect
        name="parentId"
        label="上级部门"
        request={fetchDeptTree}
        placeholder="请选择上级部门"
        fieldProps={{
          fieldNames: {
            label: 'deptName',
            value: 'deptId',
          },
        }}
        rules={[{ required: true, message: '请选择上级部门' }]}
      />

      <ProFormText
        name="deptName"
        label="部门名称"
        placeholder={readOnly ? '未填写' : '请输入部门名称'}
        rules={[{ required: true, message: '请输入部门名称' }]}
      />

      <ProFormDigit
        name="sortOrder"
        label="显示排序"
        placeholder={readOnly ? '未填写' : '请输入显示排序'}
        fieldProps={{
          precision: 0,
        }}
        rules={[{ required: true, message: '请输入显示排序' }]}
      />

      <ProFormText
        name="leader"
        label="负责人"
        placeholder={readOnly ? '未填写' : '请输入负责人'}
      />

      <ProFormText
        name="phone"
        label="联系电话"
        placeholder={readOnly ? '未填写' : '请输入联系电话'}
      />

      <ProFormText name="email" label="邮箱" placeholder={readOnly ? '未填写' : '请输入邮箱'} />

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
        rules={[{ required: true, message: '请选择状态' }]}
      />
    </ModalForm>
  );
};

export default SaveForm;
