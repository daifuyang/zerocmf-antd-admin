/**
 * 通用文件下载方法
 * @param content 已加载的内容(Blob/File/ArrayBuffer等)
 * @param filename 下载文件名
 * @returns Promise<boolean>
 */
export const downloadBlob = async (content: Blob | File | ArrayBuffer, filename: string): Promise<boolean> => {
  try {
    let blob: Blob;
    if (content instanceof ArrayBuffer) {
      blob = new Blob([content]);
    } else {
      blob = content;
    }
    
    // 创建Object URL
    const blobUrl = window.URL.createObjectURL(blob);
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = blobUrl;
    
    // 处理文件名
    link.download = filename;
    link.style.display = 'none';
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    
    // 清理资源
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);

    return true;
  } catch (error) {
    console.error('下载文件失败:', error);
    return false;
  }
};

/**
 * 从URL下载文件
 * @param url 文件URL
 * @param filename 可选文件名，如果不提供则从URL或响应头中提取
 * @returns Promise<boolean>
 */
export const downloadFromUrl = async (url: string, filename?: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 尝试从Content-Disposition头获取文件名
    const contentDisposition = response.headers.get('Content-Disposition');
    let extractedFilename = filename;
    if (!extractedFilename && contentDisposition) {
      const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
      if (matches && matches[1]) {
        extractedFilename = matches[1].replace(/['"]/g, '');
      }
    }

    // 如果还是没有文件名，从URL中提取
    if (!extractedFilename) {
      const urlObj = new URL(url);
      extractedFilename = urlObj.pathname.split('/').pop() || 'download';
    }

    const blob = await response.blob();
    return downloadBlob(blob, extractedFilename);
  } catch (error) {
    console.error('下载文件失败:', error);
    return false;
  }
};
