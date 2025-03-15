import React from 'react';
import { ProTable, ProColumns, PageContainer, ActionType } from '@ant-design/pro-components';

import { Button, Divider, message, Popconfirm, Space, Typography } from 'antd';
import { deleteUser, getUsers } from '@/services/ant-design-pro/admins'; // 调用用户相关的服务接口
import { PlusOutlined } from '@ant-design/icons';
import SaveForm from './saveForm'; // 表单保存组件
import statusColumns from '@/components/Table/Form/StatusSelect';

// 列定义
const columns: ProColumns<API.User>[] = [
  {
    title: 'ID',
    dataIndex: 'userId',
    width: 80,
    hideInSearch: true,
  },
  {
    title: '登录名',
    dataIndex: 'loginName',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 150,
  },
  {
    title: '登录IP',
    dataIndex: 'loginIp',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '最后登录时间',
    dataIndex: 'loginTime',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    width: 120,
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
    width: 80,
    ...statusColumns
  },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    render: (text, record, _, action) => (
      <Space split={<Divider type="vertical" />}>
        <SaveForm
          title="查看用户"
          initialValues={record}
          readOnly
        >
          <Typography.Link>查看</Typography.Link>
        </SaveForm>
        <SaveForm
          title="编辑用户"
          initialValues={record}
          onOk={() => {
            action?.reload();
          }}
        >
          <Typography.Link>编辑</Typography.Link>
        </SaveForm>
        <Popconfirm
          title="您确定删除该用户吗？"
          onConfirm={async () => {
            const res = await deleteUser({ userId: record.userId });
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

const UserList: React.FC = () => {
  const tableRef = React.useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<API.User>
        actionRef={tableRef}
        columns={columns}
        request={async (params) => {
          const res = await getUsers(params); // 获取用户列表的接口
          if (res.code === 1) {
            return {
              ...res.data,
              success: true,
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
        rowKey="userId"
        toolBarRender={() => [
          <SaveForm
            title="新建用户"
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

export default UserList;
