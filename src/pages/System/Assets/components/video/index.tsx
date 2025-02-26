import React, { useState, useEffect, useRef } from 'react';
import { PageHeader, Button, List, Card, Upload, message, Spin } from 'antd';
import { VideoPreview } from '@zerocmf/antd-form';
import { DeleteOutlined, VideoCameraTwoTone } from '@ant-design/icons';
import { getAssets, deleteAssets } from '@/services/assets';
import { uploadProps } from '../props';

const Video = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const videoRef = useRef<any>(null);

  // 分页current
  const [pageCurrent, setPageCurrent] = useState(1);

  // 获取资源数据列表
  const getData = async (params: any) => {
    setLoading(true);
    const submitData = { ...params, type: 2 };
    const result = await getAssets(submitData);
    let paginationData = [];
    if (result.code === 1) {
      paginationData = result.data.data;
      let resultData: any = [];
      paginationData.forEach((element: any) => {
        resultData = [
          ...resultData,
          {
            id: element.id,
            file_name: element.file_name,
            file_path: element.file_path,
            prev_path: element.prev_path,
            remark_name: element.remark_name,
          },
        ];
      });
      setData(resultData);
      setTotal(result.data.total);
    }
    setLoading(false);
    return { data: paginationData };
  };

  const upload = uploadProps(2, getData);

  // 删除单项
  const deleteItem = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: any) => {
    setLoading(true);
    e.stopPropagation();
    const result = await deleteAssets(id);
    if (result.code === 1) {
      getData([]);
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
    setLoading(false);
  };

  // 首次加载读取数据
  useEffect(() => {
    getData({ current: 1 });
  }, []);

  const openPreview = (item: any) => {
    videoRef.current.open(item.prev_path);
  };

  return (
    <Spin spinning={loading}>
      <VideoPreview ref={videoRef} />
      <PageHeader
        style={{ padding: 0 }}
        title={`视频（共${total}条）`}
        extra={[
          <Upload key="upload" {...upload}>
            <Button type="primary">上传</Button>
          </Upload>,
        ]}
      >
        <List
          grid={{ gutter: 16, column: 6, xs: 2, sm: 4, md: 4, lg: 6 }}
          dataSource={data}
          pagination={{
            position: 'bottom',
            current: pageCurrent,
            total,
            onChange: (page) => {
              setPageCurrent(page);
              getData({ current: page });
            },
            pageSize: 10,
          }}
          renderItem={(item: any) => (
            <List.Item>
              <Card
                onClick={() => openPreview(item)}
                cover={<VideoCameraTwoTone style={{ fontSize: '4rem' }} />}
                className="assets-thumbnail video-thumbnail"
                hoverable={true}
              >
                <div className="title">{item.remark_name}</div>
                <div
                  onClick={(e) => {
                    deleteItem(e, item.id);
                  }}
                  className="deleteIcon"
                >
                  <DeleteOutlined style={{ fontSize: '0.8rem' }} />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </PageHeader>
    </Spin>
  );
};

export default Video;
