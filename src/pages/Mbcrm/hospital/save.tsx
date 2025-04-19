import { PageContainer } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormDigit,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest, history, useParams } from 'umi';
import { useEffect, useRef } from 'react';
import { getHospital, updateHospital, createHospital } from '@/services/ant-design-pro/hospital';
import { Card, message, Space } from 'antd';

const HospitalForm = () => {
  const { hospitalId } = useParams() || {};
  const formRef = useRef<any>();
  const { data: hospital } = useRequest<{ data: any }>(() => {
    if (hospitalId) {
      return getHospital({ hospitalId: Number(hospitalId) });
    }
    return Promise.resolve({ data: null });
  });

  const onFinish = async (values: any) => {
    try {
      if (hospitalId) {
        await updateHospital(
          {
            hospitalId: Number(hospitalId),
          },
          values,
        );
        message.success('更新成功');
      } else {
        await createHospital(values);
        message.success('创建成功');
      }
      history.push('/mbcrm/hospital/list');
    } catch (error) {
      message.error('操作失败');
    }
  };

  useEffect(() => {
    if (hospital) {
      // Safely access user.loginName
      const loginName = hospital.user ? hospital.user.loginName : undefined;
      const formData = { ...hospital, loginName };
      formRef.current?.setFieldsValue(formData);
    }
  }, [hospital]);

  return (
    <PageContainer>
      <Card>
        <ProForm
          grid={true}
          formRef={formRef}
          onFinish={onFinish}
          submitter={{
            render: (_, dom) => (
              <div style={{ textAlign: 'center' }}>
                <Space>{dom}</Space>
              </div>
            ),
          }}
        >
          <ProForm.Group title="基本信息" collapsible>
            <ProFormText
              name="loginName"
              label="用户名"
              rules={hospitalId ? [] : [{ required: true, message: '用户名不能为空' }]}
              fieldProps={{
                autoComplete: 'off',
                disabled: hospitalId ? true : false,
              }}
              colProps={{ span: 12 }}
            />

            <ProFormText.Password
              name="password"
              label="密码"
              rules={hospitalId ? [] : [{ required: true, min: 6, message: '密码不能少于6个字符' }]}
              fieldProps={{
                autoComplete: 'new-password',
              }}
              colProps={{ span: 12 }}
            />

            <ProFormText
              name="hospitalName"
              label="医院名称"
              rules={[{ required: true, message: '医院名称不能为空' }]}
              colProps={{ span: 12 }}
            />
            <ProFormText
              name="email"
              label="绑定推送邮箱"
              rules={[
                { required: true, message: '推送邮箱不能为空' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
              colProps={{ span: 12 }}
            />
            <ProFormText name="phone" label="咨询电话" colProps={{ span: 12 }} />
            <ProFormSelect
              name="hospitalType"
              label="医院性质"
              options={[
                { label: '公立', value: 0 },
                { label: '民营', value: 1 },
              ]}
              colProps={{ span: 12 }}
              fieldProps={{ style: { width: '100%' } }}
            />
            <ProFormDigit
              name="avgPrice"
              label="医院均价"
              min={0}
              fieldProps={{ precision: 2 }}
              colProps={{ span: 12 }}
            />
            <ProFormText name="website" label="医院网址" colProps={{ span: 12 }} />
          </ProForm.Group>

          <ProForm.Group title="地址信息" collapsible>
            <ProFormText name="province" label="省份" colProps={{ span: 12 }} />
            <ProFormText name="city" label="城市" colProps={{ span: 12 }} />
            <ProFormText name="district" label="区域" colProps={{ span: 12 }} />
            <ProFormText name="address" label="详细地址" colProps={{ span: 12 }} />
          </ProForm.Group>

          <ProForm.Group title="联系人信息" collapsible>
            <ProFormText name="contactName" label="就医联系人姓名" colProps={{ span: 12 }} />
            <ProFormText name="contactPhone" label="就医联系电话" colProps={{ span: 12 }} />
            <ProFormText name="contactQQ" label="就医QQ" colProps={{ span: 12 }} />
            <ProFormText name="contactWechat" label="就医微信" colProps={{ span: 12 }} />
            <ProFormText name="frontName" label="前台联系人姓名" colProps={{ span: 12 }} />
            <ProFormText name="frontPhone" label="前台联系电话" colProps={{ span: 12 }} />
            <ProFormText name="frontQQ" label="前台QQ" colProps={{ span: 12 }} />
            <ProFormText name="frontWechat" label="前台微信" colProps={{ span: 12 }} />
          </ProForm.Group>

          <ProForm.Group title="交通信息" collapsible>
            <ProFormText name="busStation" label="公交站台" colProps={{ span: 12 }} />
            <ProFormText name="metroStation" label="地铁站台" colProps={{ span: 12 }} />
            <ProFormTextArea name="busRoute" label="公交详细路线" colProps={{ span: 12 }} />
            <ProFormTextArea name="metroRoute" label="地铁详细路线" colProps={{ span: 12 }} />
          </ProForm.Group>

          <ProForm.Group title="其他信息" collapsible>
            <ProFormText name="memberDiscount" label="会员优惠(%)" colProps={{ span: 12 }} />
            <ProFormDigit
              name="rebate"
              label="医院返点(%)"
              min={0}
              max={100}
              colProps={{ span: 12 }}
            />
            <ProFormTextArea name="introduction" label="医院介绍" colProps={{ span: 24 }} />
          </ProForm.Group>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default HospitalForm;
