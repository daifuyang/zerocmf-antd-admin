import { updateUser } from '@/services/ant-design-pro/admins';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { App, Spin, Typography, Space, Col } from 'antd';
import React, { useState } from 'react';
import { ImagePicker } from '@/pages/System/Media/components/MediaPicker';

const { Title } = Typography;

const UserSettings: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  if (!currentUser) {
    return <Spin size="large" />;
  }

  const handleUpdate = async (values: API.User) => {
    setLoading(true);
    try {
      const res = await updateUser({ userId: currentUser.userId }, values);
      if (res.code === 1) {
        message.success('个人信息更新成功');
        // 更新全局状态中的用户信息
        if (initialState?.fetchUserInfo) {
          const userInfo = await initialState.fetchUserInfo();
          setInitialState((s) => ({
            ...s,
            currentUser: userInfo,
          }));
        }
      } else {
        message.error(res.msg || '更新失败');
      }
    } catch (error) {
      message.error('更新失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProCard>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={4}>个人设置</Title>
        <ProForm
          style={{ maxWidth: '800px' }}
          loading={loading}
          initialValues={currentUser}
          onFinish={handleUpdate}
          layout="vertical"
          grid={true}
          rowProps={{
            gutter: [16, 0],
          }}
          submitter={{
            searchConfig: {
              submitText: '保存修改',
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            submitButtonProps: {
              size: 'large',
              style: {
                width: '120px',
              },
            },
          }}
        >
          <ProFormText name="userId" label="用户ID" disabled hidden />


            <ProFormText
              name="loginName"
              label="登录账号"
              disabled
              placeholder="用户名不可修改"
              colProps={{ span: 12 }}
            />
            <ProFormText
              name="nickname"
              label="用户昵称"
              placeholder="请输入昵称"
              rules={[{ required: true, message: '请输入昵称' }]}
              colProps={{ span: 12 }}
            />
          

  
            <ProFormText.Password
              name="password"
              label="密码"
              placeholder="请输入密码，不修改请留空"
              fieldProps={{
                autoComplete: 'new-password',
              }}
              colProps={{ span: 12 }}
            />
            <ProFormText.Password
              name="confirmPassword"
              label="确认密码"
              placeholder="请再次输入密码"
              colProps={{ span: 12 }}
              dependencies={['password']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            />

            <Col span={12}>
            <ProForm.Item name="avatar" label="头像">
                <ImagePicker />
            </ProForm.Item>
            </Col>
            <ProFormText
              name="realname"
              label="真实姓名"
              placeholder="请输入真实姓名"
              colProps={{ span: 12 }}
            />

          <ProForm.Group>
            <ProFormRadio.Group
              name="gender"
              label="性别"
              colProps={{ span: 12 }}
              options={[
                { label: '保密', value: 0 },
                { label: '男', value: 1 },
                { label: '女', value: 2 },
              ]}
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormText
              name="email"
              label="邮箱"
              placeholder="请输入邮箱"
              colProps={{ span: 12 }}
            />
            <ProFormText
              name="phone"
              label="手机号码"
              placeholder="请输入手机号"
              colProps={{ span: 12 }}
              rules={[{ pattern: /^1\d{10}$/, message: '请输入有效的手机号' }]}
            />
          </ProForm.Group>

          <ProFormTextArea
            name="remark"
            label="个人简介"
            placeholder="请输入个人简介"
            fieldProps={{
              autoSize: { minRows: 5, maxRows: 8 },
            }}
          />
        </ProForm>
      </Space>
    </ProCard>
  );
};

export default UserSettings;
