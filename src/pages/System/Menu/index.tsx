import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Divider, Popconfirm, Space, Tag, Tooltip, message } from 'antd';
import { useRef } from 'react';
import SaveForm from './saveForm';
import { deleteMenu, getMenus } from '@/services/ant-design-pro/menus';
import statusColumns from '@/components/Table/Form/StatusSelect';

export default () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Menu>[] = [
    {
      width: 180,
      title: '菜单名称',
      dataIndex: 'menuName',
      ellipsis: {
        showTitle: false,
      },
      render: (menuName) => (
        <Tooltip placement="topLeft" color="#fff" title={menuName}>
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
      render: (_, record) => (record.icon ? <Tag color="blue">{record.icon}</Tag> : undefined),
    },
    {
      title: '排序',
      dataIndex: 'sortOrder',
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
      valueType: 'select',
      ...statusColumns,
    },
    {
      title: '创建时间',
      width: 200,
      dataIndex: 'createdTime',
      valueType: 'dateTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '操作',
      width: 200,
      valueType: 'option',
      key: 'option',
      render: (text, record) => {
        return (
          <Space split={<Divider type="vertical" />}>
            <SaveForm title="查看菜单" initialValues={record} readOnly>
              <a key="view">查看</a>
            </SaveForm>
            <SaveForm title="编辑菜单" key="editable" initialValues={record}>
              <a>编辑</a>
            </SaveForm>
            <Popconfirm
              title="确认删除菜单?"
              okText="确认"
              cancelText="取消"
              okButtonProps={{ danger: true }}
              onConfirm={async () => {
                try {
                  const res = await deleteMenu({ menuId: record.menuId });
                  if (res.code === 1) {
                    message.success(res.msg);
                  } else {
                    message.error(res.msg);
                  }
                  actionRef.current?.reload();
                } catch (error) {
                  message.error('删除失败');
                }
              }}
            >
              <Button type="link" danger size="small" key="delete">
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Menu, API.getMenusParams>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          // 状态转换为数字
          const res: any = await getMenus(params);
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
        pagination={false}
        search={{
          labelWidth: 'auto',
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
    </PageContainer>
  );
};
