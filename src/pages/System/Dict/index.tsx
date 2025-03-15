import React, { useRef } from 'react';
import { ProTable, ProColumns, PageContainer, ActionType } from '@ant-design/pro-components';
import { Button, Divider, message, Popconfirm, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getDictTypeList, deleteDictType } from '@/services/ant-design-pro/dicts';
import SaveForm from './saveForm';
import { Link } from '@umijs/max';
import statusColumns from '@/components/Table/Form/StatusSelect';

const columns: ProColumns<API.DictType>[] = [
  {
    title: '字典ID',
    dataIndex: 'dictId',
    hideInSearch: true,
    width: 100,
  },
  {
    title: '字典名称',
    dataIndex: 'dictName',
    width: 150,
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    width: 180,
    renderText: (val, record) => <Link to={`/system/dict/data/${record.dictId}`}>{val}</Link>,
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
    hideInSearch: true,
    width: 200,
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    valueType: 'dateTime',
    width: 180,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 180,
    render: (text, record, _, action) => (
      <Space split={<Divider type="vertical" />}>
        <SaveForm title="编辑字典类型" initialValues={record} onOk={() => action?.reload()}>
          <Typography.Link>编辑</Typography.Link>
        </SaveForm>
        <Popconfirm
          title="确认删除?"
          onConfirm={async () => {
            if (!record.dictId) {
              message.error('字典类型ID不能为空');
              return;
            }
            const res = await deleteDictType({ dictId: record.dictId });
            if (res.code === 1) {
              message.success(res.msg);
              action?.reload();
            } else {
              message.error(res.msg);
            }
          }}
        >
          <Typography.Link type="danger">删除</Typography.Link>
        </Popconfirm>
      </Space>
    ),
  },
];

export default () => {
  const tableRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<API.DictType>
        actionRef={tableRef}
        columns={columns}
        request={async (params) => {
          const res = await getDictTypeList(params);
          return {
            success: res.code === 1,
            ...res.data,
          };
        }}
        rowKey="dictId"
        toolBarRender={() => [
          <SaveForm
            key="add"
            title="新建字典类型"
            onOk={async () => {
              tableRef.current?.reload();
            }}
          >
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </SaveForm>,
        ]}
      />
    </PageContainer>
  );
};
