'use client';
import { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Divider, Popconfirm, Space, Tag, message } from 'antd';
import { deleteArticle, getArticleList } from '@/services/ant-design-pro/articles';
import Save from './save';
import dayjs from 'dayjs';
import { getArticleCategoryList } from '@/services/ant-design-pro/articleCategories';

export default function List() {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Article>[] = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      valueType: 'treeSelect',
      request: async () => {
        const res = await getArticleCategoryList({ isTree: true });
        if (res.code !== 1) {
          message.error(res.msg);
        }
        return res.data as API.ArticleCategory[];
      },
      fieldProps: {
        fieldNames: {
          value: 'articleCategoryId',
          label: 'name',
        },
        showSearch: true,
      },
      render: (_, record) => {
        return record.category?.map((item: any) => {
          return (
            <Tag color="processing" key={item.categoryId}>
              {item.categoryName}
            </Tag>
          );
        });
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedTime',
      search: false,
    },
    {
      title: '发布人',
      dataIndex: 'creator',
      search: false,
    },
    {
      title: '发布状态',
      dataIndex: 'articleStatus',
      search: false,
      renderText: (_, record) => {
        return record.articleStatus === 1 ? '已发布' : '未发布';
      },
    },
    {
      title: '操作',
      width: 180,
      valueType: 'option',
      render: (text, record: API.Article) => {
        const categoryIds = record.category?.map?.((item: any) => {
          return {
            value: item.categoryId,
            label: item.categoryName,
          };
        });
        const publishedAt = dayjs.unix(record.publishedAt);
        return (
          <Space split={<Divider type="vertical" />}>
            <Save
              title="编辑文章"
              key="editable"
              onFinish={() => {
                actionRef.current?.reload();
              }}
              initialValues={{ ...record, categoryIds, publishedAt }}
            >
              <a key="editable">编辑</a>
            </Save>
            <a key="view" onClick={() => {}}>
              查看
            </a>
            <Popconfirm
              title="确定删除吗?"
              onConfirm={async () => {
                const res = await deleteArticle({ articleId: record.articleId });
                if (res.code !== 1) {
                  message.error(res.msg);
                  return;
                }
                message.success(res.msg);
                actionRef.current?.reload();
              }}
            >
              <a style={{ color: '#ff4d4f' }} key="del">
                删除
              </a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Article>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          const res = await getArticleList(params);
          if (res.code === 1) {
            return {
              ...res.data,
              success: true,
            };
          }

          return {
            success: false,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="articleId"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        headerTitle="文章列表"
        toolBarRender={() => [
          <Save
            key="Save"
            onFinish={() => {
              actionRef.current?.reload();
            }}
          />,
        ]}
      />
    </PageContainer>
  );
}
