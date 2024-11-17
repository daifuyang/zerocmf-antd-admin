import { addRole, getRole, updateRole } from '@/services/ant-design-pro/roles';
import { Role } from '@/typings/role';
import { ModalForm, ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components';
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
  const [form] = Form.useForm<Role>();
  const { message } = App.useApp();

  const [open, setOpen] = useState(false);
  const { title, children, initialValues={ status : 1}, readOnly = false, onOk } = props;

  const fetchData = useCallback(
    async (id: number) => {
      try {
        const res = await getRole({ id });
        if (res.code === 1) {
          form.setFieldsValue(res.data as Role);
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
        destroyOnClose: true,
        onCancel: () => {},
      }}
      onFinish={async (values) => {
        let res: any;
        if (values?.id) {
          res = await updateRole({ id: values.id }, values);
        }else {
          res = await addRole(values);
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
      <ProFormText name="id" label="id" hidden></ProFormText>
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
        name="sort"
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
    </ModalForm>
  );
};

export default SaveForm;
