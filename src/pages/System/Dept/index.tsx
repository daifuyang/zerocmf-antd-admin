import React, { useRef, useState } from 'react';
import { ProTable, ProColumns, PageContainer, ActionType } from '@ant-design/pro-components';
import { Button, Divider, message, Popconfirm, Space, Typography } from 'antd';
import { deleteDept, getDeptTree } from '@/services/ant-design-pro/depts';
import { PlusOutlined } from '@ant-design/icons';
import SaveForm from './saveForm';
import statusColumns from '@/components/Table/Form/StatusSelect';

// 列定义
const columns: ProColumns<API.DeptTree>[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    width: 100,
    hideInSearch: true,
    sorter: true,
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    width: 120,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 180,
    hideInSearch: true,
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
    ...statusColumns
  },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    render: (text, record, _, action) => (
      <Space split={<Divider type="vertical" />}>
        <SaveForm
          title="查看部门"
          initialValues={record}
          readOnly
        >
          <Typography.Link>查看</Typography.Link>
        </SaveForm>
        <SaveForm
          title="编辑部门"
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
            if (!record?.deptId) {
              message.error('请选择部门！');
              return;
            }
            const res = await deleteDept({ deptId: record?.deptId });
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

const DeptList: React.FC = () => {
  const tableRef = useRef<ActionType>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const flattenTreeIds = (treeData: any[]): React.Key[] => {
    let ids: React.Key[] = [];
    treeData.forEach((item) => {
      ids.push(item.deptId);
      if (item.children) {
        ids = [...ids, ...flattenTreeIds(item.children)];
      }
    });
    return ids;
  };

  return (
    <PageContainer>
      <ProTable<API.DeptTree, API.getDeptTreeParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params) => {
          const res = await getDeptTree(params);
          if (res.code === 1) {
            if (expandedRowKeys?.length === 0) {
              const flattenIds = flattenTreeIds(res.data);
              setExpandedRowKeys(flattenIds);
            }
            return {
              data: res.data,
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
        rowKey="deptId"
        toolBarRender={() => [
          <SaveForm
            title="新建部门"
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

export default DeptList;
