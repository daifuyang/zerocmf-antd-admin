import React, { useCallback, useEffect, useState } from 'react';
import { ProFormText, ProFormDigit, ProFormRadio } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-form';
import { createDictData, updateDictData } from '@/services/ant-design-pro/dictsData';
import { getDictType } from '@/services/ant-design-pro/dicts';
import { App, Form } from 'antd';

interface Props {
  title: string;
  initialValues?: API.DictData;
  onOk?: () => void;
  children?: JSX.Element;
  readOnly?: boolean;
  dictId?: string;
}

export default ({ title, initialValues, onOk, children, readOnly, dictId }: Props) => {
  const { message } = App.useApp();

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const fetchDictType = useCallback(async (dictId: number) => {
    const res = await getDictType({
      dictId,
    });
    if (res.code === 1) {
      form.setFieldsValue({
        dictType: res.data?.dictType || '',
      });
    }
  }, []);

  useEffect(() => {
    if (open && dictId) {
      fetchDictType(Number(dictId));
    }
  }, [dictId, open]);

  return (
    <ModalForm
      form={form}
      title={title}
      open={open}
      onOpenChange={(visible) => {
        if (!visible) {
          form.resetFields();
        }
        setOpen(visible);
      }}
      modalProps={{
        destroyOnClose: true,
      }}
      width="500px"
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      trigger={children}
      onFinish={async (values) => {
        let res;
        if (initialValues?.dictCode) {
          res = await updateDictData(
            {
              dictCode: initialValues.dictCode,
            },
            values as API.DictDataUpdate,
          );
        } else {
          res = await createDictData(values as API.DictDataCreate);
        }
        if (res.code === 1) {
          onOk?.();
          return true;
        }
        message.error(res.msg);
        return false;
      }}
      initialValues={initialValues}
    >
      <ProFormText
        name="dictType"
        label="字典类型"
        fieldProps={{
          readOnly: true,
        }}
        rules={[{ required: true, message: '请输入字典类型' }]}
      />

      <ProFormText
        name="dictLabel"
        label="字典标签"
        rules={[{ required: true, message: '请输入字典标签' }]}
        disabled={readOnly}
      />
      <ProFormText
        name="dictValue"
        label="字典值"
        rules={[{ required: true, message: '请输入字典值' }]}
        disabled={readOnly}
      />
      <ProFormText name="cssClass" label="样式属性" disabled={readOnly} />
      <ProFormText name="listClass" label="回显样式" disabled={readOnly} />
      <ProFormDigit
        name="dictSort"
        label="排序"
        min={0}
        fieldProps={{ precision: 0 }}
        disabled={readOnly}
      />
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
        initialValue={1}
        disabled={readOnly}
      />
      <ProFormRadio.Group
        name="isDefault"
        label="是否默认"
        options={[
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: 0,
          },
        ]}
        initialValue={0}
        disabled={readOnly}
      />
      <ProFormText name="remark" label="备注" disabled={readOnly} />
      <ProFormText name="dictCode" hidden />
    </ModalForm>
  );
};
