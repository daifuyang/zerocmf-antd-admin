import React, { useState, useEffect, useCallback } from 'react';
import { downloadFromUrl } from '@/utils/download';
import './index.less';
import { createRoot } from 'react-dom/client';
import {
  Button,
  List,
  Card,
  Upload,
  Image as AntImage,
  App,
  Tooltip,
  Popconfirm,
  Tree,
  Input,
  Space,
  Dropdown,
  Checkbox,
  Modal,
} from 'antd';
import type { DataNode } from 'antd/es/tree';
type MediaCategoryTreeNode = DataNode & {
  key: React.Key;
  title: string;
  name: string;
  categoryId?: number;
  parentId?: number;
  children?: MediaCategoryTreeNode[];
};
import CategoryForm from './CategoryForm';

import { getMedias, deleteMedia, updateMedia } from '@/services/ant-design-pro/medias';
import {
  CloseOutlined,
  CustomerServiceTwoTone,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  FileTwoTone,
  FolderOutlined,
  SearchOutlined,
  VideoCameraTwoTone,
  PlusOutlined,
} from '@ant-design/icons';

import {
  deleteMediaCategory,
  getMediaCategoryTree,
} from '@/services/ant-design-pro/mediaCategories';

import { uploadProps } from '../props';

const title = {
  0: '图片',
  1: '音频',
  2: '视频',
  3: '附件',
};

interface CoverProps {
  type: 0 | 1 | 2 | 3;
  item: any;
}
const Cover = (props: CoverProps) => {
  const { type, item } = props;
  switch (type) {
    case 0:
      return (
        <div className="media-thumbnail-img">
          <img alt={item.remarkName} src={item.prevPath} />
        </div>
      );
    case 1:
      return (
        <div className="media-thumbnail-icon">
          <CustomerServiceTwoTone style={{ fontSize: '4rem' }} />
        </div>
      );
    case 2:
      return (
        <div className="media-thumbnail-icon">
          <VideoCameraTwoTone style={{ fontSize: '4rem' }} />
        </div>
      );
    case 3:
      return (
        <div className="media-thumbnail-icon">
          <FileTwoTone style={{ fontSize: '4rem' }} />
        </div>
      );
  }
};

interface Props {
  type: 0 | 1 | 2 | 3;
}

interface MediaModalProps {
  type: 0 | 1 | 2 | 3;
  item: any;
  onClose?: () => void;
}

const MediaModal = (props: MediaModalProps) => {
  const { type, item, onClose } = props;

  return (
    <div
      onClick={() => {
        onClose?.();
      }}
      className="media-modal"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="media-modal-content"
      >
        <div
          onClick={() => {
            onClose?.();
          }}
          className="media-modal-close"
        >
          <CloseOutlined />
        </div>

        {type === 1 && (
          <div className="media-modal-audio">
            <h2>{item.remarkName}</h2>
            <audio src={item?.prevPath} controls></audio>
          </div>
        )}
        {type === 2 && (
          <div className="media-modal-video">
            <h2>{item.remarkName}</h2>
            <video src={item?.prevPath} controls></video>
          </div>
        )}
      </div>
    </div>
  );
};

MediaModal.open = (params: { item: any; type: 0 | 1 | 2 | 3 }) => {
  const { item, type } = params;
  const div = document.createElement('div');
  div.className = 'media-modal-root';
  document.body.append(div);
  const root = createRoot(div);

  function close() {
    div.remove();
    root.unmount();
  }
  return root.render(<MediaModal type={type} item={item} onClose={close} />);
};

const Media = (props: Props) => {
  const { type: mediaType } = props;
  const { message } = App.useApp();

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [prevPath, setPrevPath] = useState('');
  const [mediaCategories, setMediaCategories] = useState<MediaCategoryTreeNode[]>([]); // 新增状态：存储媒体分类数据
  const [categoryId, setCategoryId] = useState<number | bigint | string>(0);
  const [categoryFormVisible, setCategoryFormVisible] = useState(false); // 控制分类表单弹窗的显示
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const [currentCategory, setCurrentCategory] = useState<API.MediaCategory>({
    categoryId: undefined,
    name: '',
    parentId: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [moveModalVisible, setMoveModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [searchValue, setSearchValue] = useState('');
  const [targetCategoryId, setTargetCategoryId] = useState<number | bigint | string>(0);

  // 分页current
  const [pageCurrent, setPageCurrent] = useState(1);
  const [type, setType] = useState<0 | 1 | 2 | 3>(0); // 新增状态：存储媒体类型

  // 获取资源数据列表
  const getData = useCallback(
    async (params: any) => {
      setLoading(true);
      setTotal(0);
      setData([]);
      const formData = { ...params, categoryId, type: mediaType };
      const result: any = await getMedias(formData);
      if (result.code === 1 && result.data) {
        setTotal(result.data.total);
        setData(result.data.data);
      }
      setLoading(false);
      setType(mediaType);
    },
    [categoryId, mediaType],
  );

  // 首次加载读取数据
  useEffect(() => {
    getData({ current: 1 });
  }, [categoryId, mediaType]);

  // 递归获取所有分类ID，用于展开树
  const getAllCategoryIds = (categories: API.MediaCategory[]): React.Key[] => {
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

  // 新增：获取媒体分类数据
  const fetchMediaCategories = async () => {
    const result = await getMediaCategoryTree({});
    if (result.code === 1) {
      const categoriesData: MediaCategoryTreeNode[] = [
        { 
          key: 0,
          title: '全部',
          name: '全部',
          categoryId: 0,
          isLeaf: false
        },
        ...(Array.isArray(result.data) ? result.data.map(cat => ({
          key: cat.categoryId || 0,
          title: cat.name || '',
          name: cat.name || '',
          categoryId: cat.categoryId,
          parentId: cat.parentId,
          isLeaf: !cat.children?.length,
          children: cat.children?.map(child => ({
            key: child.categoryId || 0,
            title: child.name || '',
            name: child.name || '',
            categoryId: child.categoryId,
            parentId: child.parentId,
            isLeaf: !child.children?.length,
            children: child.children?.map(grandchild => ({
              key: grandchild.categoryId || 0,
              title: grandchild.name || '',
              name: grandchild.name || '',
              categoryId: grandchild.categoryId,
              parentId: grandchild.parentId,
              isLeaf: true
            }))
          }))
        })) : []),
      ];
      setMediaCategories(categoriesData);

      // 设置展开的节点
      const allIds = getAllCategoryIds(Array.isArray(result.data) ? result.data : []);
      setExpandedKeys(allIds);
    }
  };

  useEffect(() => {
    fetchMediaCategories();
  }, []);

  // 删除分类
  const handleDeleteCategory = async (categoryId: string | number) => {
    try {
      const result = await deleteMediaCategory({ categoryId: Number(categoryId) });
      if (result.code === 1) {
        message.success(result.msg || '删除成功');
        fetchMediaCategories();
        // 如果删除的是当前选中的分类，则重置选中的分类
        if (categoryId === Number(categoryId)) {
          setCategoryId('');
        }
      } else {
        message.error(result.msg || '删除失败');
      }
    } catch (error) {
      message.error('删除分类失败');
    }
  };

  // 删除单项
  const deleteItem = async (
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement> | undefined,
    mediaId: number,
  ) => {
    if (e && 'stopPropagation' in e) {
      e.stopPropagation();
    }
    setLoading(true);
    const result = await deleteMedia({
      mediaId,
    });
    if (result.code === 1) {
      getData({});
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
    setLoading(false);
  };

  return (
    <>
      {prevPath !== '' && (
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
      {/* 用来存放媒体分类 */}
      <div className="media-container">
        <div className="media-category">
          <div className="media-category-search">
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Input
                suffix={<SearchOutlined />}
                type="text"
                placeholder="搜索媒体分类"
                style={{ flex: 1 }}
              />
              <Tooltip title="添加分类">
                <PlusOutlined
                  onClick={() => {
                    setCurrentCategory({ categoryId: undefined, name: '', parentId: 0 });
                    setCategoryFormVisible(true);
                  }}
                  style={{ cursor: 'pointer', fontSize: '16px' }}
                />
              </Tooltip>
            </Space>
          </div>

          {/* 统一的分类表单弹窗 */}
          <CategoryForm
            visible={categoryFormVisible}
            onCancel={() => setCategoryFormVisible(false)}
            onSuccess={() => {
              setCategoryFormVisible(false);
              fetchMediaCategories();
            }}
            initialValues={currentCategory}
          />

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
            titleRender={(node: any) => {
              const nodeKey = node.categoryId || 0;
              return (
                <div className="tree-node-wrapper">
                  <span className="tree-node-title">{node.name}</span>

                  {nodeKey !== 0 && (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'add-child',
                            label: '添加子分类',
                            icon: <PlusOutlined />,
                            onClick: (e) => {
                              e.domEvent.stopPropagation();
                              setCurrentCategory({
                                categoryId: undefined,
                                name: '',
                                parentId: nodeKey,
                              });
                              setCategoryFormVisible(true);
                            }
                          },
                          {
                            key: 'rename',
                            label: '重命名',
                            icon: <EditOutlined />,
                            onClick: (e) => {
                              e.domEvent.stopPropagation();
                              setCurrentCategory({
                                categoryId: nodeKey,
                                parentId: node.parentId,
                                name: node.name,
                              });
                              setCategoryFormVisible(true);
                            }
                          },
                          {
                            key: 'delete',
                            label: (
                              <Popconfirm
                                title="确定删除该分类吗?"
                                onConfirm={(e) => {
                                  e?.stopPropagation();
                                  handleDeleteCategory(nodeKey);
                                }}
                                okText="确定"
                                cancelText="取消"
                              >
                                <span onClick={(e) => e.stopPropagation()}>删除分类</span>
                              </Popconfirm>
                            ),
                            icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
                            danger: true
                          }
                        ]
                      }}
                      trigger={['click']}
                      placement="bottomRight"
                    >
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<EllipsisOutlined />}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Dropdown>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div className="media-content">
          <div className="media-content-header">
            <h5 className="media-content-header-title">
              {title[type]}（共{total}条）
            </h5>

            <div className="media-content-header-action">
              <Upload
                key="upload"
                {...uploadProps({
                  type,
                  categoryId: Number(categoryId),
                  setLoading,
                  message,
                  onChange: getData,
                })}
              >
                <Button type="primary">上传</Button>
              </Upload>
            </div>
          </div>

          <List
            grid={{ gutter: 16, column: 5, xs: 2, sm: 4, md: 4, lg: 6 }}
            loading={loading}
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
            renderItem={(item: any) => {
              return (
                <List.Item>
                  <Card
                    cover={
                      <div className="media-card-cover">
                        <Cover type={type} item={item} />
                        <div className="media-card-actions">
                          <Checkbox className="media-card-checkbox" />
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  key: 'download',
                                  label: '下载',
                                  icon: <DownloadOutlined />,
                                  onClick: async () => {
                                    await downloadFromUrl(item.prevPath, item.remarkName);
                                  },
                                },
                                {
                                  key: 'preview',
                                  label: '预览',
                                  icon: <EyeOutlined />,
                                  onClick: () => {
                                    if (type === 0) {
                                      setPrevPath(item.prevPath);
                                      return;
                                    }
                                    if (type === 3) {
                                      window.open(item.prevPath);
                                      return;
                                    }
                                    MediaModal.open({ item, type });
                                  },
                                },
                                {
                                  key: 'move',
                                  label: '移动',
                                  icon: <FolderOutlined />,
                                  onClick: (e) => {
                                    e.domEvent.stopPropagation();
                                    setSelectedMedia(item);
                                    setMoveModalVisible(true);
                                  },
                                },
                                {
                                  key: 'rename',
                                  label: '重命名',
                                  icon: <EditOutlined />,
                                  onClick: () => {
                                    setEditingId(item.mediaId);
                                    setEditingValue(item.remarkName);
                                  },
                                },
                                {
                                  key: 'delete',
                                  label: (
                                    <Popconfirm
                                      title="确定要删除这个文件吗？"
                                      onConfirm={(e) => {
                                        if (e) e.stopPropagation();
                                        deleteItem(undefined, item.mediaId);
                                      }}
                                      okText="确定"
                                      cancelText="取消"
                                      placement="topRight"
                                    >
                                      <div onClick={(e) => e.stopPropagation()}>
                                        删除
                                      </div>
                                    </Popconfirm>
                                  ),
                                  icon: <DeleteOutlined />,
                                  danger: true,
                                },
                              ],
                            }}
                            trigger={['click']}
                            placement="bottomLeft"
                          >
                            <Button 
                              type="text" 
                              className="media-card-more"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <EllipsisOutlined style={{ fontSize: '16px' }} />
                            </Button>
                          </Dropdown>
                        </div>
                      </div>
                    }
                    className={`media-thumbnail ${editingId === item.mediaId ? 'editing' : ''}`}
                    hoverable={editingId !== item.mediaId}
                  >
                    <div className="title">
                      {editingId === item.mediaId ? (
                        <Input
                          autoFocus
                          allowClear
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onBlur={() => {
                            if (!editingValue.trim()) {
                              // 如果输入为空，取消修改
                              setEditingId(null);
                              return;
                            }
                            
                            if (editingValue.trim() !== item.remarkName) {
                              updateMedia(
                                { mediaId: item.mediaId },
                                { remarkName: editingValue.trim() }
                              )
                                .then(res => {
                                  if (res.code === 1) {
                                    message.success(res.msg);
                                    getData({ current: pageCurrent });
                                  } else {
                                    message.error(res.msg);
                                    setEditingValue(item.remarkName);
                                  }
                                })
                                .catch(() => {
                                  setEditingValue(item.remarkName);
                                })
                                .finally(() => {
                                  setEditingId(null);
                                });
                            } else {
                              setEditingId(null);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              (e.target as HTMLInputElement).blur();
                            }
                            if (e.key === 'Escape') {
                              setEditingId(null);
                            }
                          }}
                          size="small"
                          style={{ width: '100%' }}
                        />
                      ) : (
                        item.remarkName
                      )}
                    </div>
                    {editingId !== item.mediaId && (
                      <Tooltip title="编辑文件名">
                        <EditOutlined 
                          className="title-edit"
                          onClick={() => {
                            setEditingId(item.mediaId);
                            setEditingValue(item.remarkName);
                          }}
                        />
                      </Tooltip>
                    )}
                  </Card>
                </List.Item>
              );
            }}
          />
        </div>
      </div>

      {/* 移动资源弹窗 */}
      <Modal
        title={`移动${title[type]} ${selectedMedia?.remarkName || ''}`}
        open={moveModalVisible}
        onCancel={() => setMoveModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setMoveModalVisible(false)}>
            取消
          </Button>,
          <Button 
            key="move" 
            type="primary" 
            onClick={async () => {
              if (selectedMedia && targetCategoryId) {
                try {
                  const result = await updateMedia(
                    { mediaId: selectedMedia.mediaId },
                    { 
                      ...selectedMedia,
                      categoryId: Number(targetCategoryId) 
                    },
                    {}
                  );
                  if (result.code === 1) {
                    message.success('移动成功');
                    getData({ current: pageCurrent });
                    setMoveModalVisible(false);
                  } else {
                    message.error(result.msg || '移动失败');
                  }
                } catch (error) {
                  message.error('移动失败');
                }
              }
            }}
          >
            确定移动
          </Button>
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <Input.Search 
            placeholder="搜索分类" 
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Tree
          treeData={mediaCategories
            .filter(cat => 
              (cat.name && cat.name.toLowerCase().includes(searchValue.toLowerCase())) ||
              cat.categoryId === 0 // 总是显示"全部"分类
            )
            .map(cat => ({
              key: cat.key,
              title: cat.title,
              children: cat.children?.map(child => ({
                key: child.key,
                title: child.title,
                children: child.children?.map(grandchild => ({
                  key: grandchild.key,
                  title: grandchild.title,
                  isLeaf: true
                })),
                isLeaf: !child.children?.length
              })),
              isLeaf: !cat.children?.length
            }))}
          selectedKeys={[targetCategoryId]}
          onSelect={(selectedKeys) => {
            if (selectedKeys.length > 0) {
              setTargetCategoryId(selectedKeys[0]);
            }
          }}
          showIcon
          blockNode
          fieldNames={{
            title: 'name',
            key: 'categoryId',
            children: 'children',
          }}
        />
      </Modal>
    </>
  );
};

export default Media;
