import { useRef } from 'react';
import { Popconfirm, message } from 'antd';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { getArticleTagList, deleteTag } from '@/services/ant-design-pro/tags';
import { PageContainer } from '@ant-design/pro-components';

interface TagItem {
  id: number;
  name: string;
  articleCount: number;
  status: string;
}

const Tag: React.FC = () => {
  const ref = useRef<ActionType>();

  const confirmDelete = async (tagId: number) => {
    const result = await deleteTag({ tagId });
    if (result.code === 1) {
      message.success(result.msg);
      ref.current?.reload();
      return;
    }
    message.error(result.msg);
  };

  const columns: any = [
    {
      title: '标签',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '文章数',
      dataIndex: 'articleCount',
      key: 'articleCount',
      search: false,
    },
    {
      title: '操作',
      width: 120,
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, item: TagItem) => (
        <>
          <Popconfirm
            title="您确定删除吗?"
            okText="确认"
            cancelText="取消"
            onConfirm={() => confirmDelete(item.id)}
            placement="topRight"
          >
            <a style={{ color: '#ff4d4f' }}>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const getData = async (params: any) => {
    const result: any = await getArticleTagList(params);
    let data: TagItem[] = [];
    if (result.code === 1) {
      data = result.data?.data || [];
      if (data) {
        data.map((v) => {
          const temp = v;
          temp.status = status[v.status as unknown as number];
          return temp;
        });
      }
    }
    return { data };
  };

  return (
    <PageContainer>
      <ProTable<TagItem>
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        headerTitle="标签管理"
        request={getData}
        actionRef={ref}
      />
    </PageContainer>
  );
};

export default Tag;
