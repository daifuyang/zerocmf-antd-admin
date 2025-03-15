import React, { useRef } from 'react';
import { ProTable, ProColumns, PageContainer, ActionType } from '@ant-design/pro-components';
import { Button, Divider, message, Popconfirm, Space, Typography } from 'antd';
import { deletePost, getPostList } from '@/services/ant-design-pro/posts';
import { PlusOutlined } from '@ant-design/icons';
import SaveForm from './saveForm';
import statusColumns from '@/components/Table/Form/StatusSelect';

// 列定义
const columns: ProColumns<API.Post>[] = [
  {
    title: '岗位编码',
    dataIndex: 'postCode',
    width: 150,
  },
  {
    title: '岗位名称',
    dataIndex: 'postName',
    width: 150,
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    width: 100,
    hideInSearch: true,
    sorter: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    width: 200,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTimeRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    width: 100,
    ...statusColumns,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 150,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    render: (text, record, _, action) => (
      <Space split={<Divider type="vertical" />}>
        <SaveForm
          title="查看岗位"
          initialValues={record}
          readOnly
        >
          <Typography.Link>查看</Typography.Link>
        </SaveForm>
        <SaveForm
          title="编辑岗位"
          initialValues={record}
          onOk={() => {
            action?.reload();
          }}
        >
          <Typography.Link>编辑</Typography.Link>
        </SaveForm>
        <Popconfirm
          title="您确定删除吗？"
          onConfirm={async () => {
            if (!record.postId) {
              message.error('岗位不存在！');
              return;
            }
            const res = await deletePost({ postId: record.postId });
            if (res.code === 1) {
              message.success(res.msg);
              action?.reload();
              return;
            }
            message.error(res.msg);
          }}
        >
          <Typography.Link type="danger">删除</Typography.Link>
        </Popconfirm>
      </Space>
    ),
  },
];

const PostList: React.FC = () => {
  const tableRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<API.Post, API.getPostListParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params) => {
          const res = await getPostList(params);
          if (res.code === 1) {
            return {
              data: res.data?.data,
              success: true,
              total: res.data?.total,
            };
          }
          return {
            success: false,
            data: [],
          };
        }}
        pagination={{
          defaultPageSize: 10,
        }}
        rowKey="postId"
        toolBarRender={() => [
          <SaveForm
            title="新建岗位"
            key="add"
            onOk={() => {
              tableRef.current?.reload();
            }}
          >
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </SaveForm>,
        ]}
        search={{
          labelWidth: 'auto',
        }}
      />
    </PageContainer>
  );
};

export default PostList;
