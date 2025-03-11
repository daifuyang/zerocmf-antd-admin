import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, TreeSelect, message } from 'antd';
import {
  addMediaCategory,
  getMediaCategoryList,
  updateMediaCategory,
} from '@/services/ant-design-pro/mediaCategories';

interface CategoryFormProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  initialValues: API.MediaCategory;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  visible,
  onCancel,
  onSuccess,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // 获取分类列表数据
  const fetchCategories = async () => {
    try {
      const result = await getMediaCategoryList({ pageSize: 0 });
      if (result.code === 1) {
        // 添加顶级分类选项
        setCategories([
          { name: '顶级分类', categoryId: 0 },
          ...(Array.isArray(result.data) ? result.data : []),
        ]);
      }
    } catch (error) {
      console.error('获取分类列表失败:', error);
    }
  };

  // 组件挂载时获取分类列表
  useEffect(() => {
    if (visible) {
      fetchCategories();
    }
  }, [visible]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      let result = null;
      if (initialValues?.categoryId) {
        result = await updateMediaCategory(
          {
            categoryId: Number(values?.categoryId),
          },
          {
            name: values.name,
            parentId: Number(values.parentId || 0),
          },
        );
      } else {
        result = await addMediaCategory({
          parentId: Number(values.parentId || 0),
          name: values.name,
        });
      }

      setLoading(false);

      if (result.code === 1) {
        message.success(result.msg || '添加成功');
        form.resetFields();
        onSuccess();
      } else {
        message.error(result.msg || '添加失败');
      }
    } catch (error) {
      setLoading(false);
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Modal
      title={initialValues?.categoryId ? '编辑分类' : '添加分类'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        clearOnDestroy={true}
        preserve={false}
      >
        <Form.Item name="parentId" label="上级分类">
          <TreeSelect
            treeData={categories}
            placeholder="请选择上级分类"
            allowClear
            treeDefaultExpandAll
            fieldNames={{
              label: 'name',
              value: 'categoryId',
              children: 'children',
            }}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
