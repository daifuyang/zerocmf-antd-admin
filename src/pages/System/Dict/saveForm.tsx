import React from 'react';
import { ModalForm, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import { createDictType, updateDictType } from '@/services/ant-design-pro/dicts';
import { App, Form } from 'antd';

interface Props {
  title: string;
  initialValues?: API.DictType;
  onOk?: (values: API.DictType) => void;
  readOnly?: boolean;
  children?: JSX.Element;
}

export default ({ title, initialValues, onOk, readOnly, children }: Props) => {
  const { message } = App.useApp();

  const [form] = Form.useForm<API.DictType>();

  return (
    <ModalForm<API.DictType>
      form={form}
      title={title}
      trigger={children}
      initialValues={initialValues}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      modalProps={{
        destroyOnClose: true,
      }}
      onOpenChange={(visible) => {
        if (!visible) {
          form.resetFields();
        }
      }}
      onFinish={async (values) => {
        let res;
        const { dictId } = values;
        if (dictId) {
          res = await updateDictType({ dictId }, values);
        } else {
          res = await createDictType(values);
        }
        if (res.code === 1) {
          message.success(res.msg);
          onOk?.(values);
          return true;
        } else {
          message.error(res.msg);
          return false;
        }
      }}
      readonly={readOnly}
    >
      <ProFormText name="dictId" label="dictId" hidden />
      <ProFormText
        name="dictName"
        label="字典名称"
        rules={[{ required: true }]}
        disabled={readOnly}
      />
      <ProFormText
        name="dictType"
        label="字典类型"
        rules={[{ required: true }]}
        disabled={readOnly}
      />
      <ProFormText name="remark" label="备注" disabled={readOnly} />
      <ProFormRadio.Group
        name="status"
        label="状态"
        initialValue={1}
        options={[
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ]}
        disabled={readOnly}
      />
    </ModalForm>
  );
};
