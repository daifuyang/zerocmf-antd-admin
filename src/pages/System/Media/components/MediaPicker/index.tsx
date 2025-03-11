import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  Button,
  List,
  Card,
  Image as AntImage,
  App,
  Tooltip,
  Tree,
  Input,
  Empty,
  Upload,
  Space,
  Image,
} from 'antd';
import { SearchOutlined, EyeOutlined, CloudUploadOutlined, PictureOutlined } from '@ant-design/icons';
import { getMedias, addMedia } from '@/services/ant-design-pro/medias';
import { getMediaCategoryTree } from '@/services/ant-design-pro/mediaCategories';

import '../../media.less';

interface MediaPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ImagePickerProps {
  value?: string;
  onChange?: (value: string) => void;
}

interface MediaItem {
  mediaId: number;
  remarkName: string;
  prevPath: string;
  filePath: string;
  [key: string]: any;
}

const Cover = (props: { item: MediaItem }) => {
  const { item } = props;
  return (
    <div className="media-thumbnail-img">
      <img alt={item.remarkName} src={item.prevPath} />
    </div>
  );
};

const MediaPicker: React.FC<MediaPickerProps> = (props) => {
  const { onChange, open, onOpenChange } = props;
  const { message } = App.useApp();

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<MediaItem[]>([]);
  const [prevPath, setPrevPath] = useState('');
  const [mediaCategories, setMediaCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number | bigint | string>(0);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  // 获取资源数据列表
  const getData = useCallback(
    async (params: any) => {
      setLoading(true);
      setTotal(0);
      setData([]);
      const formData = { ...params, categoryId, type: 0, keyword: searchKeyword }; // 只获取图片类型
      try {
        const result: any = await getMedias(formData);
        if (result.code === 1 && result.data) {
          setTotal(result.data.total);
          setData(result.data.data);
        }
      } catch (error) {
        console.error('获取媒体列表失败:', error);
        message.error('获取媒体列表失败');
      } finally {
        setLoading(false);
      }
    },
    [categoryId, searchKeyword],
  );

  // 递归获取所有分类ID，用于展开树
  const getAllCategoryIds = (categories: any[]): React.Key[] => {
    let ids: React.Key[] = [];
    categories.forEach((category) => {
      if (category.categoryId !== undefined) {
        ids.push(category.categoryId);
      }
      if (category.children && category.children.length > 0) {
        ids = [...ids, ...getAllCategoryIds(category.children)];
      }
    });
    return ids;
  };

  // 获取媒体分类数据
  const fetchMediaCategories = async () => {
    try {
      const result = await getMediaCategoryTree({});
      if (result.code === 1) {
        const categoriesData = [
          { name: '全部', categoryId: 0 },
          ...(Array.isArray(result.data) ? result.data : []),
        ];
        setMediaCategories(categoriesData);

        // 设置展开的节点
        const allIds = getAllCategoryIds(Array.isArray(result.data) ? result.data : []);
        setExpandedKeys(allIds);
      }
    } catch (error) {
      console.error('获取分类列表失败:', error);
      message.error('获取分类列表失败');
    }
  };

  // 首次加载读取数据
  useEffect(() => {
    if (open) {
      getData({ current: 1 });
      fetchMediaCategories();
    }
  }, [open]);

  // 当分类或搜索关键词变化时重新加载数据
  useEffect(() => {
    if (open) {
      getData({ current: 1 });
      setPageCurrent(1);
    }
  }, [categoryId, searchKeyword, open]);

  // 选择媒体项
  const handleSelectMedia = (item: MediaItem) => {
    // 如果点击的是已选中的图片，则取消选择
    if (selectedMedia?.mediaId === item.mediaId) {
      setSelectedMedia(null);
    } else {
      setSelectedMedia(item);
    }
  };

  // 确认选择
  const handleConfirm = () => {
    if (selectedMedia) {
      onChange?.(selectedMedia.filePath);
      onOpenChange(false);
    } else {
      message.warning('请选择一张图片');
    }
  };

  // 搜索处理
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // 处理上传
  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    setUploadLoading(true);

    try {
      const res: any = await addMedia(
        {
          type: '0', // 图片类型
          categoryId: Number(categoryId),
        },
        file as File,
      );

      if (res.code === 1) {
        message.success('上传成功');
        onSuccess(res);
        // 刷新列表并自动选中新上传的图片
        getData({ current: 1 });
      } else {
        message.error(res.msg || '上传失败');
        onError(new Error(res.msg || '上传失败'));
      }
    } catch (error) {
      message.error('上传失败');
      onError(new Error('上传失败'));
    } finally {
      setUploadLoading(false);
    }
  };

  // 获取上传按钮的token
  const getUploadHeaders = () => {
    const str = localStorage.getItem('token');
    let headers: any = {};
    if (str) {
      const token = JSON.parse(str);
      headers.authorization = `Bearer ${token.accessToken}`;
    }
    return headers;
  };

  return (
    <Modal
      title="选择图片"
      open={open}
      onCancel={() => onOpenChange(false)}
      width={1000}
      footer={[
        <Button key="cancel" onClick={() => onOpenChange(false)}>
          取消
        </Button>,
        <Button key="confirm" type="primary" onClick={handleConfirm}>
          确定
        </Button>,
      ]}
    >
      <div className="media-container" style={{ display: 'flex', height: '500px' }}>
        {/* 左侧分类树 */}
        <div
          className="media-category"
          style={{
            width: '250px',
            borderRight: '1px solid #f0f0f0',
            padding: '10px',
            overflow: 'auto',
          }}
        >
          <div className="media-category-search" style={{ marginBottom: '10px' }}>
            <Input
              suffix={<SearchOutlined />}
              type="text"
              placeholder="搜索媒体分类"
              style={{ width: '100%' }}
            />
          </div>

          <Tree
            treeData={mediaCategories}
            selectedKeys={[categoryId]}
            onSelect={(selectedKeys) => {
              if (selectedKeys.length > 0) {
                setCategoryId(selectedKeys[0]);
              }
            }}
            showIcon
            blockNode
            expandedKeys={expandedKeys}
            onExpand={(keys) => setExpandedKeys(keys)}
            fieldNames={{
              title: 'name',
              key: 'categoryId',
              children: 'children',
            }}
          />
        </div>

        {/* 右侧媒体内容 */}
        <div className="media-content" style={{ flex: 1, padding: '10px', overflow: 'auto' }}>
          <div
            className="media-content-header"
            style={{
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h5 className="media-content-header-title" style={{ margin: 0 }}>
              图片（共{total}条）
            </h5>

            <div className="media-content-header-actions" style={{ display: 'flex', gap: '10px' }}>
              <Upload
                name="file"
                showUploadList={false}
                customRequest={handleUpload}
                headers={getUploadHeaders()}
              >
                <Button type="primary" icon={<CloudUploadOutlined />} loading={uploadLoading}>
                  上传图片
                </Button>
              </Upload>
              <Input
                placeholder="搜索图片"
                suffix={<SearchOutlined />}
                style={{ width: '250px' }}
                value={searchKeyword}
                onChange={handleSearch}
                allowClear
              />
            </div>
          </div>

       
            {data.length > 0 ? (
              <List
                loading={loading}
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                pagination={{
                  position: 'bottom',
                  current: pageCurrent,
                  total,
                  onChange: (page) => {
                    setPageCurrent(page);
                    getData({ current: page });
                  },
                  pageSize: 12,
                }}
                renderItem={(item: MediaItem) => {
                  const isSelected = selectedMedia?.mediaId === item.mediaId;
                  return (
                    <List.Item>
                      <Card
                        cover={<Cover item={item} />}
                        className="media-thumbnail"
                        hoverable={true}
                        style={{
                          border: isSelected ? '2px solid #1890ff' : '1px solid #f0f0f0',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleSelectMedia(item)}
                      >
                        <div
                          className="title"
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.remarkName}
                        </div>
                        <div className="action">
                          <div className="action-item">
                            <Tooltip title="预览" placement="top">
                              <EyeOutlined
                                className="preview-icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPrevPath(item.prevPath);
                                }}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </Card>
                    </List.Item>
                  );
                }}
              />
            ) : (
              <Empty description="暂无图片" />
            )}


          {prevPath && (
            <AntImage
              style={{ display: 'none' }}
              preview={{
                visible: prevPath !== '',
                src: prevPath,
                onVisibleChange: (value) => {
                  setPrevPath(value ? prevPath : '');
                },
              }}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

// ImagePicker组件作为MediaPicker的子组件导出
export const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const { value, onChange } = props;
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  
  // 处理媒体选择器的值变化
  const handleMediaChange = (filePath: string) => {
    if (onChange) {
      onChange(filePath);
    }
  };

  // 处理移除图片
  const handleRemoveImage = () => {
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {value ? (
        <div className='media-input-container'>
          <Image className='media-input-img' src={value} />
          <Space style={{ marginLeft: '24px' }}>
            <Button 
              type="primary"
              onClick={() => setMediaPickerOpen(true)}
            >
              更换
            </Button>
            <Button 
              danger
              onClick={handleRemoveImage}
            >
              移除
            </Button>
          </Space>
        </div>
      ) : (
        <Button 
          icon={<PictureOutlined />} 
          onClick={() => setMediaPickerOpen(true)}
        >
          上传图片
        </Button>
      )}
      <MediaPicker
        value={value}
        onChange={handleMediaChange}
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
      />
    </div>
  );
};

export default MediaPicker;
