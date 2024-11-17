import React from 'react';
import { ProTable, ProColumns, PageContainer, ActionType } from '@ant-design/pro-components';
import { Admin } from '@/typings/admin'; // 使用上次的User类型
import { Button, Divider, message, Popconfirm, Space, Tag, Typography } from 'antd';
import { deleteUser, getUsers } from '@/services/ant-design-pro/admins'; // 调用用户相关的服务接口
import { PlusOutlined } from '@ant-design/icons';
import SaveForm from './saveForm'; // 表单保存组件

const valueEnum: any = {
  all: '',
  enabled: 1,
  disabled: 0,
};

// 列定义
const columns: ProColumns<Admin>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
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
    initialValue: 'all',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      enabled: { text: '启用', status: 'Success' },
      disabled: { text: '禁用', status: 'Error' },
    },
    renderText(text, record, index, action) {
      return record.status === 1 ? <Tag color="success">启用</Tag> : <Tag color="default">禁用</Tag>;
    },
  },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    render: (text, record, _, action) => (
      <Space split={<Divider type="vertical" />}>
        <SaveForm
          title="查看用户"
          initialValues={{ ...record, status: valueEnum[record.status] }}
          readOnly
        >
          <Typography.Link>查看</Typography.Link>
        </SaveForm>
        <SaveForm
          title="编辑用户"
          initialValues={{ ...record, status: valueEnum[record.status] }}
          onOk={() => {
            action?.reload();
          }}
        >
          <Typography.Link>编辑</Typography.Link>
        </SaveForm>
        <Popconfirm
          title="您确定删除该用户吗？"
          onConfirm={async () => {
            const res = await deleteUser({ id: record.id });
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
      <ProTable<Admin>
        actionRef={tableRef}
        columns={columns}
        request={async (params) => {
          const { status = '' } = params;
          params.status = undefined;
          if (valueEnum[status]) {
            params.status = valueEnum[status];
          }
          const res: any = await getUsers(params); // 获取用户列表的接口
          if (res.code === 1) {
            const data = res.data.data;
            return {
              data,
              page: res.data.page,
              total: res.data.total,
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
        rowKey="id"
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
