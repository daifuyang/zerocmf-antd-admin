import { createPost, getPost, updatePost } from '@/services/ant-design-pro/posts';
import { ModalForm, ProFormDigit, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
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
  const [form] = Form.useForm<API.Post>();
  const { message } = App.useApp();
  const { title, children, initialValues = { status: 1 }, readOnly = false, onOk } = props;

  const [open, setOpen] = useState(false);

  const fetchData = useCallback(
    async (postId: number) => {
      try {
        const res = await getPost({ postId });
        if (res.code === 1) {
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        message.error('请求失败');
      }
    },
    [message, form],
  );

  useEffect(() => {
    if (open) {
      if (initialValues?.postId) {
        fetchData(initialValues.postId);
      }
    }
  }, [open, initialValues, fetchData]);

  return (
    <ModalForm<API.Post>
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
        onCancel: () => {},
      }}
      onFinish={async (values) => {
        if (readOnly) {
          return true;
        }

        let res: any;
        const { postId } = values || {};
        if (postId) {
          res = await updatePost({ postId }, values);
        } else {
          res = await createPost(values);
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
      <ProFormText name="postId" label="postId" hidden />

      <ProFormText
        name="postCode"
        label="岗位编码"
        placeholder={readOnly ? '未填写' : '请输入岗位编码'}
        rules={[{ required: true, message: '请输入岗位编码' }]}
        fieldProps={{
          readOnly,
        }}
      />

      <ProFormText
        name="postName"
        label="岗位名称"
        placeholder={readOnly ? '未填写' : '请输入岗位名称'}
        rules={[{ required: true, message: '请输入岗位名称' }]}
        fieldProps={{
          readOnly,
        }}
      />

      <ProFormDigit
        name="sortOrder"
        label="显示排序"
        placeholder={readOnly ? '未填写' : '请输入显示排序'}
        fieldProps={{
          readOnly,
          precision: 0,
        }}
        rules={[{ required: true, message: '请输入显示排序' }]}
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
          rules={[{ required: true, message: '请选择状态' }]}
        />
      )}

      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder={readOnly ? '未填写' : '请输入备注'}
        fieldProps={{
          readOnly,
          rows: 4,
        }}
      />
    </ModalForm>
  );
};

export default SaveForm;