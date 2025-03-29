import { PageContainer, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getCustomers, deleteCustomer } from '@/services/ant-design-pro/customer';
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
      title: '年龄',
      key: 'age',
      render: (_, record) => {
        return record.birthDate;
      },
    },
    {
      title: '操作客服',
      dataIndex: ['operator', 'name'],
      key: 'operator',
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
      render: (_, record) => record.createdTime,
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
            history.push(`/mbcrm/customer/edit/${record.id}`);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            try {
              await deleteCustomer({ customerId: record.id });
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
          const response = await getCustomers(params);
          return {
            ...response.data,
            success: true,
          };
        }}
        rowKey="id"
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
