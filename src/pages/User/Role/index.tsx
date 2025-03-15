import React from 'react';
import { ProTable, ProColumns, PageContainer, ActionType } from '@ant-design/pro-components';
import { Button, Divider, message, Popconfirm, Space, Typography } from 'antd';
import { deleteRole, getRoles } from '@/services/ant-design-pro/roles';
import { PlusOutlined } from '@ant-design/icons';
import SaveForm from './saveForm';
import statusColumns from '@/components/Table/Form/StatusSelect';

// 列定义
const columns: ProColumns<API.Role>[] = [
  {
    title: '角色编号',
    dataIndex: 'roleId',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '角色描述',
    dataIndex: 'description',
    width: 280,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
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
    title: '更新时间',
    dataIndex: 'updatedTime',
    valueType: 'dateTime',
    width: 200,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    width: 100,
    ...statusColumns,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    render: (text, record, _, action) => (
      <Space split={<Divider type="vertical" />}>
        <SaveForm
          title="查看角色"
          initialValues={record}
          readOnly
        >
          <Typography.Link>查看</Typography.Link>
        </SaveForm>
        <SaveForm
          title="编辑角色"
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
            const res = await deleteRole({ roleId: record.roleId });
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

const RoleList: React.FC = () => {
  const tableRef = React.useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<API.Role>
        actionRef={tableRef}
        columns={columns}
        request={async (params) => {
          const res = await getRoles(params);
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
        rowKey="roleId"
        toolBarRender={() => [
          <SaveForm
            title="新建角色"
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

export default RoleList;
