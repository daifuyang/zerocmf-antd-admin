import { ActionType, ProColumns, ProTable, PageContainer } from '@ant-design/pro-components';
import { useRef } from 'react';
import { Button, message } from 'antd';
import { request } from '@umijs/max';
import { getOperationLogList } from '@/services/ant-design-pro/operationLogs';

const businessTypeEnum = {
  0: '其他',
  1: '新增',
  2: '修改',
  3: '删除',
  4: '授权',
  5: '导出',
  6: '导入',
  7: '强退',
  8: '生成代码',
  9: '清空数据',
};

const statusEnum = {
  1: '成功',
  0: '失败',
};

const OperateLog = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.OperationLog>[] = [
    {
      title: '日志编号',
      dataIndex: 'operId',
      search: false,
    },
    {
      title: '系统模块',
      dataIndex: 'title',
    },
    {
      title: '操作类型',
      dataIndex: 'businessType',
      valueEnum: businessTypeEnum,
    },
    {
      title: '请求方式',
      dataIndex: 'requestMethod',
      search: false,
    },
    {
      title: '操作人员',
      dataIndex: 'operName',
    },
    {
      title: '部门名称',
      dataIndex: 'deptName',
      search: false,
    },
    {
      title: '操作地址',
      dataIndex: 'operIp',
      search: false,
    },
    {
      title: '操作地点',
      dataIndex: 'operLocation',
      search: false,
    },
    {
      title: '操作状态',
      dataIndex: 'status',
      valueEnum: statusEnum,
    },
    {
      title: '操作时间',
      dataIndex: 'operTime',
      valueType: 'dateTime',
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
  ];

  const handleExport = async () => {
    try {
      const response = await request('/api/system/operlog/export', {
        method: 'GET',
        responseType: 'blob',
      });
      const blob = new Blob([response]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '操作日志.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error('导出失败');
    }
  };

  return (
    <PageContainer>
      <ProTable<API.OperationLog>
        headerTitle="操作日志"
        actionRef={actionRef}
        rowKey="operId"
        pagination={{
          showSizeChanger: true,
        }}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="export" onClick={handleExport}>
            导出
          </Button>,
        ]}
        request={async (params) => {
          const response = await getOperationLogList(params);

          if (response.code !== 1) {
            message.error(response.msg);
            return {
              data: [],
              success: false,
              total: 0,
            };
          }

          return {
            data: response.data?.data,
            success: response.code === 1,
            total: response.data?.total,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default OperateLog;
