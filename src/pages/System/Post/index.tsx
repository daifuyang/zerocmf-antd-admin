import React, { useRef } from 'react';
import { ProTable, ProColumns, PageContainer, ActionType } from '@ant-design/pro-components';
import { Post } from '@/typings/post';
import { Button, Divider, message, Popconfirm, Space, Tag, Typography } from 'antd';
import { deletePost, getPostList } from '@/services/ant-design-pro/posts';
import { PlusOutlined } from '@ant-design/icons';
import SaveForm from './saveForm';

const valueEnum: any = {
  all: '',
  enabled: 1,
  disabled: 0,
};

// 列定义
const columns: ProColumns<Post>[] = [
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
    initialValue: 'all',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      enabled: { text: '启用', status: 'Success' },
      disabled: { text: '禁用', status: 'Error' },
    },
    renderText(_, record) {
      return record.status ? <Tag color="success">启用</Tag> : <Tag color="default">禁用</Tag>;
    },
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
          initialValues={{ ...record, status: valueEnum[record.status] }}
          readOnly
        >
          <Typography.Link>查看</Typography.Link>
        </SaveForm>
        <SaveForm
          title="编辑岗位"
          initialValues={{ ...record, status: valueEnum[record.status] }}
          onOk={() => {
            action?.reload();
          }}
        >
          <Typography.Link>编辑</Typography.Link>
        </SaveForm>
        <Popconfirm
          title="您确定删除吗？"
          onConfirm={async () => {
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
      <ProTable<Post>
        actionRef={tableRef}
        columns={columns}
        request={async (params) => {
          const { status = '' } = params;
          params.status = valueEnum[status];
          const res: any = await getPostList(params as API.getPostListParams);
          if (res.code === 1) {
            return {
              data: res.data,
              success: true,
              total: res.total,
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