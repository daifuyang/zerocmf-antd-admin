import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Row, Col, Tooltip, message, InputNumber } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { getOptionValue, setOptionValue } from '@/services/ant-design-pro/options';

const name = 'upload';
const Index = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const res = await getOptionValue({ name });
    if (res.code === 1) {
      setLoading(false);
      console.log(res.data?.optionValue);
      form.setFieldsValue(res.data?.optionValue);
    } else {
      message.error(res.msg);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveUpload = async (values: any) => {
    const res = await setOptionValue({ name }, values);
    if (res.code === 1) {
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
  };

  const submitForm = async (values: any) => {
    setLoading(true);
    await saveUpload(values);
    setLoading(false);
  };

  return (
    <PageContainer loading={loading}>
      <Card>
        <Form wrapperCol={{ span: 8 }} layout="vertical" form={form} onFinish={submitForm}>
          <Form.Item
            name="maxFiles"
            initialValue=""
            label={
              <>
                <span>最大同时上传文件数</span>
                <Tooltip title="多文件上传时,用户能最大同时上传文件数,默认20个">
                  <a style={{ margin: '0 8px' }}>
                    <QuestionCircleOutlined />
                  </a>
                </Tooltip>
              </>
            }
            rules={[
              {
                required: true,
                message: '最大同时上传文件数不能为空!',
              },
            ]}
          >
            <Input placeholder="最大同时上传文件数" />
          </Form.Item>
          <Form.Item
            name="chunkSize"
            initialValue=""
            label={
              <>
                <span>文件分块上传分块大小</span>
                <Tooltip title="文件上传采用分块上传,文件分块大小默认512KB,可以根据服务器最大上传限制设置此数值">
                  <a style={{ margin: '0 8px' }}>
                    <QuestionCircleOutlined />
                  </a>
                </Tooltip>
              </>
            }
            rules={[
              {
                required: true,
                message: '文件分块上传分块大小不能为空!',
              },
            ]}
          >
            <Input placeholder="文件分块上传分块大小KB,1M=1024k" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }} wrapperCol={{ span: 24 }} label="图片文件">
            <Row>
              <Col span={8}>
                <Form.Item
                  name={['fileTypes', 'image', 'uploadMaxFileSize']}
                  initialValue=""
                  style={{ marginBottom: 0 }}
                  extra="允许上传大小默认为10240KB,1M=1024KB"
                  rules={[
                    {
                      required: true,
                      message: '允许上传大小不能为空!',
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="允许上传大小KB,1M=1024k" />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item
                  name={['fileTypes', 'image', 'extensions']}
                  initialValue=""
                  style={{ marginBottom: 0 }}
                  extra="允许上传格式默认为jpg,jpeg,png,gif,bmp"
                  rules={[
                    {
                      required: true,
                      message: '允许上传格式不能为空!',
                    },
                  ]}
                >
                  <Input placeholder="扩展名,以英文逗号分隔" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }} wrapperCol={{ span: 24 }} label="视频文件">
            <Row>
              <Col span={8}>
                <Form.Item
                  name={['fileTypes', 'video', 'uploadMaxFileSize']}
                  initialValue=""
                  style={{ marginBottom: 0 }}
                  extra="允许上传大小默认为102400KB,1M=1024KB"
                  rules={[
                    {
                      required: true,
                      message: '允许上传大小不能为空!',
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="允许上传大小KB,1M=1024KB" />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item
                  name={['fileTypes', 'video', 'extensions']}
                  initialValue=""
                  style={{ marginBottom: 0 }}
                  extra="允许上传格式默认为mp4,avi,wmv,rm,rmvb,mkv"
                  rules={[
                    {
                      required: true,
                      message: '允许上传扩展名不能为空!',
                    },
                  ]}
                >
                  <Input placeholder="扩展名,以英文逗号分隔" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }} wrapperCol={{ span: 24 }} label="音频文件">
            <Row>
              <Col span={8}>
                <Form.Item
                  name={['fileTypes', 'audio', 'uploadMaxFileSize']}
                  initialValue=""
                  style={{ marginBottom: 0 }}
                  extra="允许上传大小默认为10240KB,1M=1024KB"
                  rules={[
                    {
                      required: true,
                      message: '允许上传大小不能为空!',
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="允许上传大小KB,1M=1024k" />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item
                  name={['fileTypes', 'audio', 'extensions']}
                  initialValue=""
                  style={{ marginBottom: 0 }}
                  extra="允许上传格式默认为mp3,wma,wav"
                  rules={[
                    {
                      required: true,
                      message: '允许上传扩展名不能为空!',
                    },
                  ]}
                >
                  <Input placeholder="扩展名,以英文逗号分隔" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 24 }}
            label={
              <>
                <span>附件</span>
                <Tooltip title="允许上传大小默认为10240KB,1M=1024KB，允许上传格式默认为除以上文档类型以外的其它常用文件,如：txt,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar">
                  <a style={{ margin: '0 8px' }}>
                    <QuestionCircleOutlined />
                  </a>
                </Tooltip>
              </>
            }
          >
            <Row>
              <Col span={8}>
                <Form.Item
                  name={['fileTypes', 'file', 'uploadMaxFileSize']}
                  initialValue=""
                  style={{ marginBottom: 0 }}
                  extra="允许上传大小默认为10240KB,1M=1024KB"
                  rules={[
                    {
                      required: true,
                      message: '允许上传大小不能为空!',
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} placeholder="允许上传大小KB,1M=1024k" />
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item
                  name={['fileTypes', 'file', 'extensions']}
                  initialValue=""
                  style={{ marginBottom: 0 }}
                  extra="允许上传格式默认为txt,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar"
                  rules={[
                    {
                      required: true,
                      message: '允许上传扩展名不能为空!',
                    },
                  ]}
                >
                  <Input placeholder="扩展名,以英文逗号分隔" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button htmlType="submit" type="primary">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Index;
