import { addUser, getUser, updateUser } from '@/services/ant-design-pro/admins';
import { getRoles } from '@/services/ant-design-pro/roles';
import { Admin } from '@/typings/admin';
import { Role } from '@/typings/role';
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
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
  const [form] = Form.useForm<Admin>();
  const { message } = App.useApp();

  const [open, setOpen] = useState(false);
  const { title, children, initialValues = { status: 1 }, readOnly = false, onOk } = props;

  const fetchData = useCallback(
    async (id: number) => {
      try {
        const res = await getUser({ id });
        if (res.code === 1) {
          form.setFieldsValue(res.data as Admin);
        }
      } catch (error) {
        message.error('请求失败');
      }
    },
    [open, message, form],
  );

  useEffect(() => {
    if (open && initialValues?.id) {
      fetchData(initialValues.id);
    }
  }, [open]);

  return (
    <ModalForm<Admin>
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
      initialValues={initialValues}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
        className: "next-modal"
      }}
      onFinish={async (values) => {
        let res: any;
        if (values?.id) {
          res = await updateUser({ id: values.id }, values);
        } else {
          res = await addUser(values);
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
      <ProFormText colProps={{ span: 0 }} name="id" label="id" hidden></ProFormText>

      <ProFormText
        name="loginName"
        label="登录账号"
        placeholder="请输入登录名"
        rules={[{ required: true, message: '请输入登录名' }]}
      />
      <ProFormText.Password
        name="password"
        label="登录密码"
        placeholder="请输入登录密码"
        rules={[{ required: true, message: '请输入登录名' }]}
      />

      <ProFormText name="phone" label="手机号码" placeholder="请输入手机号码" />
      <ProFormText name="email" label="邮箱" placeholder="请输入邮箱" />

      <ProFormText name="name" label="用户昵称" placeholder="请输入用户昵称" />
      <ProFormText name="realName" label="真实姓名" placeholder="请输入真实姓名" />

      <ProFormSelect
        name="gender"
        label="性别"
        options={[
          { label: '保密', value: 0 },
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ]}
      />

      <ProFormRadio.Group
        name="status"
        label="状态"
        options={[
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ]}
      />

      <ProFormUploadButton
        colProps={{ span: 24 }}
        name="avatar"
        label="头像"
        fieldProps={{ maxCount: 1 }}
      />

      <ProFormCheckbox.Group
        colProps={{ span: 24 }}
        name="checkbox"
        label="角色"
        request={async () => {
          const res = await getRoles({ pageSize: 0 });
          if (res.code === 1) {
            return (res.data as Role[]).map((item) => {
              return {
                label: item.name,
                value: item.id,
              };
            });
          }
          return [];
        }}
      />

      <ProFormTextArea
        colProps={{ span: 24 }}
        name="remark"
        label="备注"
        placeholder="请输入备注"
      />
    </ModalForm>
  );
};

export default SaveForm;
