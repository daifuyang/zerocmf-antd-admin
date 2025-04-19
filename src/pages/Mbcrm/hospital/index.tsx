import { PageContainer, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { 
  getHospitalList,
  deleteHospital 
} from '@/services/ant-design-pro/hospital';
import { Button, message } from 'antd';
import { history } from 'umi';

const HospitalList = () => {
  const columns: ProColumns<API.Hospital>[] = [
    {
      title: '医院ID',
      dataIndex: 'hospitalId',
      key: 'hospitalId',
    },
    {
      title: '医院名称',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '医院类型',
      dataIndex: 'hospitalType',
      key: 'hospitalType',
      valueType: 'select',
      valueEnum: {
        0: { text: '未知' },
        1: { text: '公立' },
        2: { text: '民营' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_: any, record: API.Hospital) => [
        <a
          key="edit"
          onClick={() => {
            history.push(`/mbcrm/hospital/edit/${record.hospitalId}`);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            try {
              await deleteHospital({ hospitalId: record.hospitalId });
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
      <ProTable<API.Hospital>
        columns={columns}
        request={async (params) => {
          const response = await getHospitalList(params);
          return {
            ...response.data,
            success: true,
          };
        }}
        rowKey="hospitalId"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={() => {
              history.push('/mbcrm/hospital/create');
            }}
          >
            添加医院
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default HospitalList;
