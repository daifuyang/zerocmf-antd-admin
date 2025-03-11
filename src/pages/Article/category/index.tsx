'use client';

import React, { useRef, useState } from 'react';
import { ProTable, ProColumns, ActionType, PageContainer } from '@ant-design/pro-components';
import { Button, Divider, Popconfirm, Space, Typography, message } from 'antd';
import Save from './save';
import {
  getArticleCategoryList,
  deleteArticleCategory,
} from '@/services/ant-design-pro/articleCategories';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ICategory {
  articleCategoryId: number; // 分类ID
  parentId: number | null; // 父级分类ID，默认为顶级分类
  name: string; // 分类名称
  description: string; // 分类描述
  status: 'active' | 'inactive'; // 分类状态
  count: number; // 文章数
}

// 状态枚举
const statusEnum: any = {
  active: 1,
  inactive: 0,
};

function flattenTreeIds(tree: any[]): number[] {
  return tree.reduce<number[]>((acc, node) => {
    // 将当前节点的 id 加入数组
    acc.push(node.articleCategoryId);
    // 递归处理子节点
    if (node.children && node.children.length > 0) {
      acc.push(...flattenTreeIds(node.children));
    }
    return acc;
  }, []);
}

const Category: React.FC = () => {
  const ref = useRef<ActionType>();
  const columns: ProColumns<ICategory>[] = [
    {
      title: 'ID',
      dataIndex: 'articleCategoryId',
      hideInSearch: true,
    },
    {
      title: '父级ID',
      dataIndex: 'parentId',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        active: { text: '启用' },
        inactive: { text: '停用' },
      },
      renderText: (record) => {
        return record === 1 ? '启用' : '停用';
      },
    },
    {
      title: '文章数',
      dataIndex: 'articleCount',
      hideInSearch: true,
    },
    {
      title: '操作',
      width: 220,
      valueType: 'option',
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Save
            title="编辑分类"
            initialValues={{
              ...record,
            }}
            onFinish={() => {
              ref.current?.reload();
            }}
          >
            <a>编辑</a>
          </Save>
          <Save
            title="新建分类"
            initialValues={{ parentId: record.articleCategoryId }}
            onFinish={() => {
              ref.current?.reload();
            }}
          >
            <a>新建子分类</a>
          </Save>

          <Popconfirm
            title="您确定删除吗？"
            onConfirm={async () => {
              const res = await deleteArticleCategory({
                articleCategoryId: record.articleCategoryId,
              });
              if (res.code === 1) {
                ref.current?.reload();
                return;
              }
              message.error(res.msg);
            }}
          >
            <Text className="cursor-pointer" type="danger">
              删除
            </Text>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  return (
    <PageContainer>
      <ProTable<ICategory>
        actionRef={ref}
        headerTitle="文章分类"
        request={async (params: any) => {
          params.status = params.status ? statusEnum[params.status] : '';
          const res: any = await getArticleCategoryList({ ...params, isTree: true });
          if (res.code === 1) {
            const treeData = res.data;
            if (expandedRowKeys?.length === 0 && treeData.length > 0) {
              const flattenIds = flattenTreeIds(treeData);
              setExpandedRowKeys(flattenIds);
            }

            return {
              success: true,
              data: res.data,
            };
          }
          return {
            success: false,
            data: [],
          };
        }}
        pagination={false}
        search={{ labelWidth: 'auto' }}
        columns={columns}
        rowKey="articleCategoryId"
        toolBarRender={() => [
          <Save
            title="新建分类"
            onFinish={() => {
              ref.current?.reload();
            }}
            key="modalSave"
          >
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </Save>,
        ]}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: (expandedRows) => {
            setExpandedRowKeys([...expandedRows]);
          },
        }}
      />
    </PageContainer>
  );
};

export default Category;
