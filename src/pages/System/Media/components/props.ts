import { addMedia } from '@/services/ant-design-pro/medias';
import { UploadProps } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';

// 定义可能的响应类型
interface Response {
  code: number;
  msg: string;
}

export function uploadProps({
  type,
  categoryId,
  message,
  setLoading,
  onChange,
}: {
  type: number;
  categoryId: number;
  setLoading: (loading: boolean) => void;
  message: MessageInstance;
  onChange?: (info?: any) => void;
}): UploadProps {
  return {
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;

      try {
        setLoading(true);
        const res: Response = await addMedia(
          {
            type: `${type}`,
            categoryId
          },
          file as File,
        );

        if (res.code === 1) {
          onSuccess?.(res);
          setLoading(false);
        } else {
          setLoading(false);
          if (message) {
            message.error(res.msg);
          }
          throw new Error(res.msg || '未知错误');
        }
      } catch (error) {
        if (onError) {
          // 确保传递给 onError 的参数类型正确
          setLoading(false);
          onError(new Error(error instanceof Error ? error.message : String(error)));
        } else {
          setLoading(false);
          console.error('文件上传失败:', error);
        }
      }
    },
    multiple: true,
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        const { response } = info.file;
        if (response.code !== 1) {
          message.error(response.msg);
          return;
        }
        if (onChange) {
          onChange(info);
        }
        message.success(response.msg);
      }
    },
  };
}
