import { PageContainer } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormCascader,
} from '@ant-design/pro-components';
import { useRequest, history, useParams } from 'umi';
import { useEffect, useRef } from 'react';
import {
  getCustomer,
  updateCustomer,
  createCustomer,
} from '@/services/ant-design-pro/customer';
import { Card, message, Space } from 'antd';

const CustomerForm = () => {
  const { id } = useParams() || {};
  const formRef = useRef<any>();
  const { data: customer } = useRequest<{ data: any }>(() => {
    if (id) {
      return getCustomer({ customerId: Number(id) });
    }
    return Promise.resolve({ data: null });
  });
  const onFinish = async (values: any) => {
    try {
      if (id) {
        await updateCustomer(
          {
            customerId: Number(id),
          },
          values,
        );
        message.success('更新成功');
      } else {
        await createCustomer(values);
        message.success('创建成功');
      }
      history.push('/mbcrm/customer');
    } catch (error) {
      message.error('操作失败');
    }
  };

  useEffect(() => {
    if (customer) {
      formRef.current?.setFieldsValue(customer);
    }
  }, [customer]);

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
            {id && (
              <ProFormText
                name="memberNo"
                label="会员ID"
                rules={[{ required: true, message: '会员ID不能为空' }]}
                colProps={{ span: 12 }}
                fieldProps={{
                  disabled: true,
                }}
              />
            )}
            <ProFormSelect
              name="operatorName"
              label="客服名称"
              options={
                 []
              }
              rules={[{ required: true, message: '客服名称不能为空' }]}
              colProps={{ span: 12 }}
              fieldProps={{ style: { width: '100%' } }}
            />
            <ProFormText
              name="name"
              label="客户姓名"
              rules={[{ required: true, message: '客户姓名不能为空' }]}
              colProps={{ span: 12 }}
            />
            <ProFormDatePicker
              name="birthDate"
              label="出生年月"
              rules={[{ required: true, message: '出生年月不能为空' }]}
              colProps={{ span: 12 }}
              fieldProps={{
                style: { width: '100%' },
                format: 'YYYY-MM-DD',
                placeholder: '请选择出生年月',
              }}
            />
            <ProFormSelect
              name="gender"
              label="性别"
              options={[
                { label: '男', value: '男' },
                { label: '女', value: '女' },
              ]}
              rules={[{ required: true, message: '性别不能为空' }]}
              colProps={{ span: 12 }}
              fieldProps={{ style: { width: '100%' } }}
            />
            <ProFormSelect
              name="status"
              label="客户状态"
              options={[
                { label: '资料录入', value: 0 },
                { label: '待跟进', value: 1 },
                { label: '重单', value: 2 },
                { label: '已手术', value: 3 },
                { label: '无效用户', value: 4 },
              ]}
              rules={[{ required: true, message: '客户状态不能为空' }]}
              colProps={{ span: 12 }}
              fieldProps={{ style: { width: '100%' } }}
            />
          </ProForm.Group>

          <ProForm.Group title="地址信息" collapsible>
            <ProFormCascader
              name="address"
              label="省市区"
              fieldProps={{
                changeOnSelect: true,
                fieldNames: {
                  label: 'name',
                  value: 'name',
                  children: 'children'
                }
              }}
              rules={[{ required: true, message: '请选择省市区' }]}
              colProps={{ span: 12 }}
              options={[
                {
                  name: '北京',
                  children: [
                    {
                      name: '北京市',
                      children: [
                        { name: '朝阳区' },
                        { name: '海淀区' },
                        { name: '西城区' }
                      ]
                    }
                  ]
                },
                {
                  name: '上海',
                  children: [
                    {
                      name: '上海市',
                      children: [
                        { name: '浦东新区' },
                        { name: '徐汇区' },
                        { name: '静安区' }
                      ]
                    }
                  ]
                },
                {
                  name: '广东',
                  children: [
                    {
                      name: '广州市',
                      children: [
                        { name: '天河区' },
                        { name: '越秀区' },
                        { name: '海珠区' }
                      ]
                    }
                  ]
                }
              ]}
            />
            <ProFormText
              name="address"
              label="详细地址"
              rules={[{ required: true, message: '详细地址不能为空' }]}
              colProps={{ span: 12 }}
            />
          </ProForm.Group>

          <ProForm.Group title="联系方式" collapsible>
            <ProFormText name="phone" label="客户电话" colProps={{ span: 12 }} />
            <ProFormText name="mobile" label="客户手机" colProps={{ span: 12 }} />
            <ProFormText name="qq" label="客户QQ" colProps={{ span: 12 }} />
            <ProFormText name="wechat" label="客户微信" colProps={{ span: 12 }} />
          </ProForm.Group>

          <ProForm.Group title="项目信息" collapsible>
            <ProFormText name="project" label="整形项目" colProps={{ span: 24 }} />
            <ProFormTextArea name="remark" label="备注" colProps={{ span: 24 }} />
          </ProForm.Group>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CustomerForm;
