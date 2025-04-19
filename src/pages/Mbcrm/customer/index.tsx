import { PageContainer, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getCustomerList, deleteCustomer } from '@/services/ant-design-pro/customer';
import { Button, message } from 'antd';
import { history } from 'umi';

const statusMap: Record<number, string> = {
  0: '资料录入',
  1: '待跟进',
  2: '重单',
  3: '已手术',
  4: '无效用户'
};

const CustomerList: React.FC = () => {

  const columns: ProColumns<API.Customer>[] = [
    {
      title: '会员编号',
      dataIndex: 'memberNo',
      key: 'memberNo',
    },
    {
      title: '会员名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '出生日期',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: '操作客服',
      key: 'operator',
      render: (_, record) => record.operator ? record.operator.name : '-',
    },
    {
      title: '整形项目',
      dataIndex: 'project',
      key: 'project',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => record.status !== undefined ? statusMap[record.status] || '-' : '-',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            history.push(`/mbcrm/customer/edit/${record.customerId}`);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            try {
              await deleteCustomer({ customerId: record.customerId });
              message.success('删除成功');
              window.location.reload();
            } catch (error) {
              message.error('删除失败');
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Customer>
        columns={columns}
        request={async (params) => {
          const response = await getCustomerList(params);
          return {
            ...response.data,
            success: true,
          };
        }}
        rowKey="customerId"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true
        }}
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={() => {
              history.push('/mbcrm/customer/create');
            }}
          >
            添加客户
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default CustomerList;
