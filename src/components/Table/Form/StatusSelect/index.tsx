import React, { useEffect, useState } from 'react';
import { Select, Tag } from 'antd';
import { getDictDataList } from '@/services/ant-design-pro/dictsData';
import { ProColumns } from '@ant-design/pro-components';

interface StatusSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  allowClear?: boolean;
  style?: React.CSSProperties;
}

// 添加缓存相关的工具函数
const CACHE_PREFIX = 'dict_cache_';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24小时过期

const getDictCache = (dictType: string) => {
  try {
    const cacheKey = `${CACHE_PREFIX}${dictType}`;
    const cacheData = localStorage.getItem(cacheKey);
    
    if (!cacheData) return null;
    
    const { data, timestamp } = JSON.parse(cacheData);
    const now = new Date().getTime();
    
    // 检查缓存是否过期
    if (now - timestamp > CACHE_EXPIRATION) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('读取字典缓存失败:', error);
    return null;
  }
};

const setDictCache = (dictType: string, data: any) => {
  try {
    const cacheKey = `${CACHE_PREFIX}${dictType}`;
    const cacheData = {
      data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error('保存字典缓存失败:', error);
  }
};

const StatusSelect: React.FC<StatusSelectProps> = ({
  value,
  onChange,
  placeholder = '请选择',
  allowClear = true,
  style,
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDictData = async () => {
      setLoading(true);
      try {
        // 先尝试从缓存获取
        const dictType = 'sys_status';
        const cachedData = getDictCache(dictType);
        
        if (cachedData) {
          // 使用缓存数据
          const allOptions = [
            { label: '全部', value: '' },
            ...cachedData.map((item: API.DictData) => ({
              label: item?.dictLabel || '',
              value: item?.dictValue || '',
            })),
          ];
          setOptions(allOptions);
          setLoading(false);
          return;
        }
        
        // 缓存不存在或已过期，从服务器获取
        const response = await getDictDataList({
          dictType,
          pageSize: 0,
        });
        
        if (response && response.data) {
          const data = (response.data || []) as API.DictData[];
          
          // 缓存到本地
          setDictCache(dictType, data);

          // 添加"全部"选项
          const allOptions = [
            { label: '全部', value: '' },
            ...data.map((item) => ({
              label: item?.dictLabel || '',
              value: item?.dictValue || '',
            })),
          ];
          setOptions(allOptions);
        }
      } catch (error) {
        console.error('获取状态字典数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDictData();
  }, []);

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      allowClear={allowClear}
      style={{ width: '100%', ...style }}
      loading={loading}
    />
  );
};

// 添加一个获取状态标签的函数
const getStatusLabel = (value: string | number) => {
  const dictType = 'sys_status';
  const cachedData = getDictCache(dictType);
  
  if (!cachedData) return value === 1 ? '启用' : '禁用'; // 缓存不存在时的默认值
  
  const valueStr = String(value);
  const dictItem = cachedData.find((item: API.DictData) => item.dictValue === valueStr);
  return dictItem?.dictLabel || (value === 1 ? '启用' : '禁用');
};

const columns: ProColumns<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderFormItem: (_, { type, defaultRender, ...rest }) => {
    return <StatusSelect {...rest} />;
  },
  renderText(text, record) {
    const statusValue = record.status;
    const statusLabel = getStatusLabel(statusValue);
    return statusValue === 1 ? 
      <Tag color="success">{statusLabel}</Tag> : 
      <Tag color="default">{statusLabel}</Tag>;
  },
};

export default columns;
