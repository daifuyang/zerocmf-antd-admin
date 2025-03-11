import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import {
  addArticleCategory,
  getArticleCategory,
  updateArticleCategory,
  getArticleCategoryList,
} from '@/services/ant-design-pro/articleCategories';
import { useEffect, useState } from 'react';
import { ImagePicker } from '@/pages/System/Media/components/MediaPicker';

interface FormProps {
  title: string;
}

interface Props {
  title: string;
  onFinish?: () => void;
  children?: JSX.Element | undefined; // 或者具体的组件类型
  initialValues?: any; // 根据实际情况指定类型
}



export default function Save(props: Props) {
  const { onFinish, children, initialValues, title } = props;

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm<FormProps>();

  useEffect(() => {
    const { articleCategoryId } = initialValues || {};
    if (form && articleCategoryId && open) {
      getArticleCategory({ articleCategoryId }).then((res: any) => {
        if (res.code === 1) {
          form.setFieldsValue(res.data);
        }
      });
    }
  }, [form, initialValues?.articleCategoryId, open]);

  return (
    <ModalForm<FormProps>
      title={title}
      width={'40%'}
      trigger={children}
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      form={form}
      modalProps={{
        destroyOnClose: true,
      }}
      initialValues={initialValues}
      onFinish={async (values: any) => {
        const { articleCategoryId = 0 } = values;
        let res = null;
        if (articleCategoryId > 0) {
          res = await updateArticleCategory({ articleCategoryId }, values);
        } else {
          res = await addArticleCategory(values);
        }
        if (res.code === 1) {
          if (onFinish) {
            onFinish();
          }

          return true;
        }
        message.error(res.msg);
        return false;
      }}
    >
      <ProFormText name="articleCategoryId" hidden />

      <ProFormTreeSelect
        fieldProps={{
          style: { maxWidth: 288 },
          treeDefaultExpandAll: true,
          fieldNames: {
            value: 'articleCategoryId',
            label: 'name',
          },
        }}
        label="父级分类"
        name="parentId"
        request={async () => {
          const res: any = await getArticleCategoryList({ isTree: true });
          if (res.code !== 1) {
            message.error(res.msg);
          }

          return [
            {
              name: '作为一级分类',
              articleCategoryId: 0,
            },
            ...res.data,
          ];
        }}
        rules={[{ required: true, message: '请选择父级分类' }]}
      />
      <ProFormText label="名称" name="name" rules={[{ required: true, message: '名称不能为空' }]} />
      <ProFormText label="自定义url" name="alias" />
      <ProForm.Item label="图标" name="icon">
        <ImagePicker />
      </ProForm.Item>
      <ProFormTextArea label="描述" name="description" />

      <ProFormDigit label="排序" name="order" min={0} fieldProps={{ precision: 0 }} />

      <ProFormRadio.Group
        name="status"
        label="状态"
        initialValue={1}
        options={[
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ]}
        rules={[{ required: true, message: '状态不能为空' }]}
      />
    </ModalForm>
  );
}
