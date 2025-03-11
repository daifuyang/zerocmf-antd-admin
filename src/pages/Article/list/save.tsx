import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form, TreeSelect, message } from 'antd';
import dayjs from 'dayjs';

import { createArticle, getArticle, updateArticle } from '@/services/ant-design-pro/articles';
import { getArticleCategoryList } from '@/services/ant-design-pro/articleCategories';

import Editor from '@zerocmf/rich-editor';

import MediaPicker, { ImagePicker } from '@/pages/System/Media/components/MediaPicker';

interface Props {
  title?: string;
  children?: JSX.Element | undefined; // 或者具体的组件类型
  initialValues?: any; // 根据实际情况指定类型
  onFinish?: () => void;
}

interface ModalFormProps {
  title: string;
}

const { SHOW_ALL } = TreeSelect;

export default function Save(props: Props) {
  const { title = '新增文章', children, initialValues, onFinish } = props;
  const [form] = Form.useForm<ModalFormProps>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const articleId = initialValues?.articleId;

    if (articleId && open) {
      const fetchData = async function () {
        const res: any = await getArticle({ articleId });
        if (res.code === 1) {
          const { category = [] } = res.data;
          form.setFieldsValue({
            ...res.data,
            categoryIds: category?.map((item: any) => {
              return {
                value: item.categoryId,
                label: item.categoryName,
              };
            }),
            publishedAt: dayjs.unix(res.data.publishedAt),
          });
        }
      };
      fetchData();
    }
  }, [initialValues, open]);

  return (
    <DrawerForm<ModalFormProps>
      title={title}
      width={'80%'}
      open={open}
      trigger={
        children || (
          <Button icon={<PlusOutlined />} type="primary">
            新建
          </Button>
        )
      }
      form={form}
      onOpenChange={(visible) => {
        setOpen(visible);
      }}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
      }}
      initialValues={initialValues}
      onFinish={async (values: any) => {
        const { articleId, categoryIds, publishedAt = undefined } = values;

        if (values['categoryIds']?.length > 0) {
          values['categoryIds'] = categoryIds.map((item: any) => item.value);
        }

        values['publishedAt'] = dayjs(publishedAt).unix();
        let res: any = null;
        if (articleId > 0) {
          res = await updateArticle({ articleId }, values);
        } else {
          res = await createArticle(values);
        }
        if (res?.code !== 1) {
          message.error(res.msg);
          return false;
        }
        if (onFinish) {
          onFinish();
        }
        message.success(res.msg);
        return true;
      }}
    >
      <ProFormText name="articleId" hidden />

      <ProFormTreeSelect
        fieldProps={{
          style: { width: 288 },
          treeDefaultExpandAll: true,
          treeCheckStrictly: true,
          treeCheckable: true,
          showCheckedStrategy: SHOW_ALL,
          fieldNames: {
            value: 'articleCategoryId',
            label: 'name',
          },
        }}
        label="分类"
        name="categoryIds"
        request={async () => {
          const res: any = await getArticleCategoryList({ isTree: true });
          if (res.code !== 1) {
            message.error(res.msg);
            return [];
          }
          return res.data;
        }}
        rules={[{ required: true, message: '请选择父级分类' }]}
      />
      <ProFormText
        label="标题"
        name="title"
        rules={[{ required: true, message: '标题不能为空' }]}
      />
      <ProFormSelect mode="tags" label="标签" name="keywords" />
      <ProFormDateTimePicker
        fieldProps={{
          style: { width: 288 },
        }}
        label="发布日期"
        name="publishedAt"
      />
      <ProForm.Item label="封面" name="thumbnail">
        <ImagePicker />
      </ProForm.Item>
      <ProFormText
        fieldProps={{
          style: { width: 288 },
        }}
        label="作者"
        name="author"
      />
      <ProFormTextArea label="摘要" name="excerpt" />

      <ProForm.Item label="详情" name="content">
        <Editor imagePickerRender={(props) => <MediaPicker {...props} />} />
      </ProForm.Item>

      <ProFormText label="自定义url" name="alias" />
    </DrawerForm>
  );
}
