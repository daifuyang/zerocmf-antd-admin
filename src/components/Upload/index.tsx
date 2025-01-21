import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Image, Upload as AntdUpload, UploadProps } from "antd";

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    type: "image" | "video" | "file";
    prevPath?: string;
}

export default function Upload(props: Props) {

    const { value, onChange, type } = props;
    const [loading, setLoading] = useState(false);

    const prevPath = value;

    const [imageUrl, setImageUrl] = useState<string | undefined>(prevPath);

    const str = localStorage.getItem("token");
    // 如果token存在，则将其添加到请求头的Authorization字段中
    let headers: any = {}
    if (str) {
        const token = JSON.parse(str);
        headers.authorization = `Bearer ${token.accessToken}`;
    }

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传</div>
        </button>
    );

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            const res = info.file.response
            if (res.code === 1) {
                const { filePath, prevPath } = res.data;

                if (onChange) {
                    onChange(filePath);
                }

                setImageUrl(prevPath);
            } else {
                setImageUrl('');
            }
            setLoading(false);

        }
    };

    return (
        <AntdUpload
            name="file"
            data={{
                type
            }}
            headers={headers}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/admin/upload"
            onChange={handleChange}
        >
            {imageUrl ? <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </AntdUpload>
    )

}