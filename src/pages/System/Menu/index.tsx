import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Divider, Space, Tag, Tooltip } from 'antd';
import { useRef } from 'react';
import SaveForm from './saveForm';
import { getMenus } from '@/services/ant-design-pro/menus';

type MenuItem = {
  id: number;
  name: string;
  icon: string;
  order: number;
  permission: string;
  component: string;
  status: string;
  created_at: string;
};

const columns: ProColumns<MenuItem>[] = [
  {
    width: 180,
    title: '菜单名称',
    dataIndex: 'menuName',
    ellipsis: {
      showTitle: false,
    },
    render: (menuName) => (
      <Tooltip placement="topLeft" color='#fff' title={menuName}>
        {menuName}
      </Tooltip>
    ),
    formItemProps: {
      rules: [
        {
          required: true,
          message: '菜单名称为必填项',
        },
      ],
    },
  },
  {
    width: 60,
    title: '图标',
    dataIndex: 'icon',
    hideInSearch: true,
    render: (_, record) => record.icon ? <Tag color="blue">{record.icon}</Tag> : undefined,
  },
  {
    title: '排序',
    dataIndex: 'order',
    valueType: 'digit',
    hideInSearch: true,
    sorter: true,
  },
  {
    title: '权限标识',
    width: 150,
    dataIndex: 'perms',
    hideInSearch: true,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      all: { text: '全部' },
      enabled: { text: '启用', status: 'Success' },
      disabled: { text: '禁用', status: 'Error' },
    },
    render: (_, record) => {
      return (
        <Tag color={record.status ? 'green' : 'red'}>
          {record.status ? '启用' : '禁用'}
        </Tag>
      );
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
    hideInSearch: true,
    sorter: true,
  },
  {
    title: '操作',
    width: 170,
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => {
      return (
        <Space split={<Divider type="vertical" />}>
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>
          <a href={`/menu/${record.id}`} key="view">
            查看
          </a>
          <a style={{ color: '#ff4d4f' }} href={`/menu/${record.id}`} key="delete">
            删除
          </a>
        </Space>
      );
    },
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<MenuItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        // 替换成你自己的API请求
        const res: any = await getMenus();
        if (res.code === 1) {
          return {
            data: res.data,
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
      rowKey="menuId"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="菜单管理"
      toolBarRender={() => [
        <SaveForm title="新建菜单" key="button">
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            新建
          </Button>
        </SaveForm>,
      ]}
    />
  );
};
