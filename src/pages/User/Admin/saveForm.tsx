import { addUser, getUser, updateUser } from '@/services/ant-design-pro/admins';
import { getRoles } from '@/services/ant-design-pro/roles';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { App, Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  title: string;
  children: JSX.Element;
  initialValues?: Partial<API.User>;
  readOnly?: boolean;
  onOk?: () => void;
}

const SaveForm = (props: Props) => {
  const [form] = Form.useForm<API.User>();
  const { message } = App.useApp();

  const [open, setOpen] = useState(false);
  const { title, children, initialValues = { status: 1 }, readOnly = false, onOk } = props;

  const fetchData = useCallback(
    async (userId: number) => {
      try {
        const res = await getUser({ userId });
        if (res.code === 1) {
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        message.error('请求失败');
      }
    },
    [open, message, form],
  );

  useEffect(() => {
    if (open && initialValues?.userId) {
      fetchData(initialValues.userId);
    }
  }, [open]);

  return (
    <ModalForm<API.User>
      title={title}
      trigger={children}
      form={form}
      open={open}
      grid={true}
      readonly={readOnly}
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
        className: 'zerocmf-modal',
      }}
      onFinish={async (values) => {
        if (readOnly) {
          return true;
        }
        let res;
        const { userId } = values || {};
        if (userId) {
          res = await updateUser({ userId }, values);
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
      <ProFormText
        colProps={{ span: 0 }}
        name="userId"
        label="userId"
        hidden
      ></ProFormText>

      <ProFormText
        name="loginName"
        label="登录账号"
        placeholder={readOnly ? '未填写' : '请输入登录名'}
        rules={[{ required: true, message: '请输入登录名' }]}
      />

      <ProFormText.Password
        name="password"
        label="登录密码"
        placeholder={readOnly ? '保密' : '请输入登录密码'}
        rules={initialValues?.userId ? [] : [{ required: true, message: '请输入登录密码' }]}
      />

      <ProFormText
        name="phone"
        label="手机号码"
        placeholder={readOnly ? '未填写' : '请输入手机号码'}
      />
      <ProFormText
        name="email"
        label="邮箱"
        placeholder={readOnly ? '未填写' : '请输入邮箱'}
      />

      <ProFormText
        name="nickname"
        label="用户昵称"
        placeholder={readOnly ? '未填写' : '请输入用户昵称'}
      />
      <ProFormText
        name="realname"
        label="真实姓名"
        placeholder={readOnly ? '未填写' : '请输入真实姓名'}
      />

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
        name="roleIds"
        label="角色"
        request={async () => {
          const res = await getRoles({ pageSize: 0 });
          if (res.code === 1) {
            return (res.data as API.Role[])?.map((item) => {
              return {
                label: item.name,
                value: item.roleId,
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
