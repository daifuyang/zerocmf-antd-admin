import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ProTable, ProColumns, ActionType, PageContainer } from '@ant-design/pro-components';
import { Button, Divider, message, Popconfirm, Space, Tag, Typography, Modal } from 'antd';
import SaveForm from './saveForm';
import { useParams, history } from '@umijs/max';
import { deleteDictData, getDictDataList, batchDeleteDictData } from '@/services/ant-design-pro/dictsData';
import { PlusOutlined } from '@ant-design/icons';
import { getDictType } from '@/services/ant-design-pro/dicts';

const columns: ProColumns<API.DictData>[] = [
  {
    title: '字典编码',
    dataIndex: 'dictCode',
    valueType: 'checkbox',
    width: 80,
    hideInSearch: true,
  },
  {
    title: '字典标签',
    dataIndex: 'dictLabel',
    width: 120,
  },
  {
    title: '字典值',
    dataIndex: 'dictValue',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '排序',
    dataIndex: 'dictSort',
    width: 80,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    width: 100,
    valueEnum: {
      '1': { text: '启用', status: 'Success' },
      '0': { text: '禁用', status: 'Error' },
    },
    renderText: (val) =>
      val === 1 ? <Tag color="success">启用</Tag> : <Tag color="default">禁用</Tag>,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    hideInSearch: true,
    width: 200,
    ellipsis: true,
  },
  {
    title: '操作',
    valueType: 'option',
    width: 160,
    render: (text, record, _, action) => (
      <Space split={<Divider type="vertical" />}>
        <SaveForm title="编辑字典数据" initialValues={record} onOk={() => action?.reload()}>
          <Typography.Link>编辑</Typography.Link>
        </SaveForm>
        <Popconfirm
          title="确认删除?"
          onConfirm={async () => {
            if (!record.dictCode) {
              message.error('字典数据ID不能为空');
              return;
            }
            const res = await deleteDictData({ dictCode: record.dictCode });
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

  // 获取pathInfo参数
  const { dictId } = useParams();

  const [dictType, setDictType] = useState<API.DictData | undefined>(undefined);
  const [selectedRows, setSelectedRows] = useState<API.DictData[]>([]);

  const handleBatchDelete = async () => {
    if (selectedRows.length === 0) {
      message.warning('请选择要删除的数据');
      return;
    }
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedRows.length} 条数据吗？`,
      onOk: async () => {
        const dictCodes = selectedRows.map(row => row.dictCode || 0);
        const res = await batchDeleteDictData({ dictCodes });
        const hasError = res.code !== 1;
        if (!hasError) {
          message.success(res.msg);
          setSelectedRows([]);
          tableRef.current?.reload();
        } else {
          message.error(res.msg);
        }
      }
    });
  };

  const fetchDictType = useCallback(async (dictId: number) => {
    const res = await getDictType({
      dictId,
    });
    if (res.code === 1) {
      setDictType(res.data);
    }
  }, []);

  useEffect(() => {
    if (dictId) {
      fetchDictType(Number(dictId));
    }
  }, [dictId]);

  return (
    <PageContainer
      onBack={() => {
        history.replace(`/system/dict`);
      }}
    >
      <ProTable
        actionRef={tableRef}
        columns={columns}
        params={{
          dictType: dictType?.dictType,
        }}
        request={async (params) => {
          if (!params?.dictType) {
            return {
              data: [],
              success: true,
              total: 0,
            };
          }
          const res = await getDictDataList({ ...params });
          return {
            success: res.code === 1,
            ...res.data
          };
        }}
        rowKey="dictCode"
        rowSelection={{
          selectedRowKeys: selectedRows.map(row => row.dictCode || 0),
          onChange: (_, rows) => setSelectedRows(rows),
        }}
        toolBarRender={() => [
          <SaveForm
            dictId={dictId}
            key="add"
            title="新建字典数据"
            onOk={() => {
              tableRef.current?.reload();
            }}
          >
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </SaveForm>,
          selectedRows.length > 0 && (
            <Button key="batchDelete" type="primary" danger onClick={handleBatchDelete}>
              删除
            </Button>
          ),
        ]}
        search={{
          labelWidth: 'auto',
        }}
      />
    </PageContainer>
  );
};
