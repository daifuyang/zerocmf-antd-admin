import React, { useRef } from 'react';
import { ProTable, ProColumns, PageContainer, ActionType } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag, Typography, Modal, Table } from 'antd';
import { ExportOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  getLoginLogList, 
  removeLoginLog, 
  cleanLoginLog,
  exportLoginLog
} from '@/services/ant-design-pro/loginLogs';
import moment from 'moment';

const LoginLogList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // 处理导出操作
  const handleExport = async () => {
    const hide = message.loading('正在导出');
    try {
      // 导出当前筛选条件下的数据
      await exportLoginLog({});
      hide();
      message.success('导出成功');
    } catch (error) {
      hide();
      message.error('导出失败，请重试');
    }
  };

  // 处理清空操作
  const handleClean = async () => {
    Modal.confirm({
      title: '确认清空',
      content: '是否确认清空所有登录日志数据？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const hide = message.loading('正在清空');
        try {
          const res = await cleanLoginLog();
          hide();
          if (res.code === 1) {
            message.success('清空成功');
            actionRef.current?.reload();
            return;
          }
          message.error(res.msg || '清空失败');
        } catch (error) {
          hide();
          message.error('清空失败，请重试');
        }
      },
    });
  };

  // 处理删除操作
  const handleRemove = async (ids: number[]) => {
    const hide = message.loading('正在删除');
    try {
      const res = await removeLoginLog({ ids });
      hide();
      if (res.code === 1) {
        message.success('删除成功');
        actionRef.current?.reload();
        return true;
      }
      message.error(res.msg || '删除失败');
      return false;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  // 表格列定义
  const columns: ProColumns<API.LoginLog>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 80,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '登录账号',
      dataIndex: 'loginName',
      width: 120,
      ellipsis: true,
    },
    {
      title: '登录IP地址',
      dataIndex: 'ipaddr',
      width: 120,
      ellipsis: true,
    },
    {
      title: '登录地点',
      dataIndex: 'loginLocation',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '浏览器类型',
      dataIndex: 'browser',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '登录状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: {
        1: { text: '成功', status: 'Success' },
        0: { text: '失败', status: 'Error' },
      },
      renderText: (val) => (
        <Tag color={val === 1 ? 'success' : 'error'}>
          {val === 1 ? '成功' : '失败'}
        </Tag>
      ),
    },
    {
      title: '提示消息',
      dataIndex: 'msg',
      width: 180,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      width: 180,
      valueType: 'dateTime',
      hideInSearch: true,
      renderText: (val) => val ? moment(val * 1000).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '登录时间',
      dataIndex: 'timeRange',
      valueType: 'dateTimeRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value?.[0] ? moment(value[0]).unix() : undefined,
            endTime: value?.[1] ? moment(value[1]).unix() : undefined,
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="确定要删除该条日志吗?"
            onConfirm={() => handleRemove([record.infoId as number])}
            okText="确定"
            cancelText="取消"
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.LoginLog>
        headerTitle="登录日志"
        actionRef={actionRef}
        rowKey="infoId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="export"
            icon={<ExportOutlined />}
            onClick={handleExport}
          >
            导出
          </Button>,
          <Button
            key="clean"
            danger
            icon={<DeleteOutlined />}
            onClick={handleClean}
          >
            清空
          </Button>,
        ]}
        request={async (params) => {
          // 处理分页参数
          const { current, pageSize, ...restParams } = params;
          
          // 调用API获取数据
          const res = await getLoginLogList({
            current,
            pageSize,
            ...restParams,
          });
          
          if (res.code === 1 && res.data) {
            return {
              data: res.data.list || [],
              success: true,
              total: res.data.total || 0,
            };
          }
          return {
            data: [],
            success: false,
            total: 0,
          };
        }}
        columns={columns}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space>
            <Button 
              type="primary" 
              danger
              onClick={() => {
                Modal.confirm({
                  title: '删除确认',
                  content: `确定删除已选中的 ${selectedRowKeys.length} 条数据吗？`,
                  onOk: async () => {
                    const success = await handleRemove(selectedRowKeys as number[]);
                    if (success) {
                      onCleanSelected();
                    }
                  },
                });
              }}
            >
              批量删除
            </Button>
          </Space>
        )}
        scroll={{ x: 1300 }}
      />
    </PageContainer>
  );
};

export default LoginLogList;
