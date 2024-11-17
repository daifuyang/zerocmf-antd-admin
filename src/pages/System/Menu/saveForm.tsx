import {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { App, Form } from 'antd';
import { useEffect, useState } from 'react';

declare interface Props {
  title: string;
  children: any;
  initialValues?: Partial<any>;
  readOnly?: boolean;
  onOk?: () => void;
}

const MenuForm = (props: Props) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [open, setOpen] = useState(false);

  const { title, children, initialValues = {}, readOnly = false, onOk } = props;

  /*   if (!initialValues?.parentId) {
    initialValues.parentId = 0;
  }

  if (!initialValues?.menuType) {
    initialValues.menuType = 'M';
  } */

  /*  const fetchData = useCallback(
    async (id: number) => {
      try {
        const res = await getMenu({ id });
        if (res.code === 1) {
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        message.error('请求失败');
      }
    },
    [open, message, form],
  ); */

  useEffect(() => {
    if (open && initialValues?.id) {
      //   fetchData(initialValues.id);
    }
  }, [open]);

  return (
    <ModalForm
      title={title}
      trigger={children}
      form={form}
      open={open}
      grid={true}
      rowProps={{
        gutter: 16,
      }}
      colProps={{
        span: 12,
      }}
      onOpenChange={(open) => setOpen(open)}
      autoFocusFirstInput
      initialValues={initialValues}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
        className: 'next-modal',
      }}
      onFinish={async (values) => {
        /* let res: any;
        if (values?.id) {
          res = await updateMenu({ id: values.id }, values);
        } else {
          res = await addMenu(values);
        }
        if (res.code === 1) {
          if (onOk) {
            onOk();
          }
          message.success(res.msg);
          return true;
        }
        message.error(res.msg); */
        return false;
      }}
    >
      <ProFormText colProps={{ span: 0 }} name="id" label="id" hidden />

      <ProFormSelect
        name="parentId"
        label="上级菜单"
        colProps={{
          span: 24,
        }}
        initialValue={0}
        request={async () => {
          /* const res = await getMenuTree();
          if (res.code === 1) {
            return res.data.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          } */
          return [
            {
              label: '顶级菜单',
              value: 0,
            },
          ];
        }}
        placeholder="请选择上级菜单"
      />

      <ProFormRadio.Group
        name="menuType"
        label="菜单类型"
        colProps={{
          span: 24,
        }}
        initialValue={'M'}
        options={[
          { label: '目录', value: 'M' },
          { label: '菜单', value: 'C' },
          { label: '按钮', value: 'F' },
        ]}
        rules={[{ required: true, message: '请选择菜单类型' }]}
      />

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType !== 'F') {
            return (
              <ProFormText
                name="icon"
                label="菜单图标"
                colProps={{
                  span: 24,
                }}
                placeholder="请输入菜单图标"
              />
            );
          }
        }}
      </ProFormDependency>
      <ProFormText
        name="name"
        label="菜单名称"
        placeholder="请输入菜单名称"
        rules={[{ required: true, message: '请输入菜单名称' }]}
      />

      <ProFormDigit name="sort" label="显示排序" placeholder="请输入显示排序" />

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType !== 'F') {
            return (
              <>
                <ProFormRadio.Group
                  name="isExternalLink"
                  label="是否外链"
                  initialValue={0}
                  options={[
                    { label: '是', value: 1 },
                    { label: '否', value: 0 },
                  ]}
                  rules={[{ required: true, message: '请选择是否外链' }]}
                />
                <ProFormText name="routePath" label="路由地址" placeholder="请输入路由地址" />
              </>
            );
          }
        }}
      </ProFormDependency>

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType === 'C') {
            return (
              <ProFormText name="componentPath" label="组件路径" placeholder="请输入组件路径" />
            );
          }
        }}
      </ProFormDependency>

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType !== 'M') {
            return <ProFormText name="permission" label="权限字符" placeholder="请输入权限字符" />;
          }
        }}
      </ProFormDependency>

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType === 'C') {
            return (
              <>
                <ProFormText name="routeParams" label="路由参数" placeholder="请输入路由参数" />
                <ProFormRadio.Group
                  name="isCache"
                  label="是否缓存"
                  options={[
                    { label: '是', value: 1 },
                    { label: '否', value: 0 },
                  ]}
                  rules={[{ required: true, message: '请选择是否缓存' }]}
                />
              </>
            );
          }
        }}
      </ProFormDependency>

      <ProFormRadio.Group
        name="visible"
        label="显示状态"
        initialValue={1}
        options={[
          { label: '显示', value: 1 },
          { label: '隐藏', value: 0 },
        ]}
        rules={[{ required: true, message: '请选择显示状态' }]}
      />

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          if (menuType !== 'F') {
            return (
              <ProFormRadio.Group
                name="status"
                label="菜单状态"
                initialValue={1}
                options={[
                  { label: '启用', value: 1 },
                  { label: '禁用', value: 0 },
                ]}
                rules={[{ required: true, message: '请选择菜单状态' }]}
              />
            );
          }
        }}
      </ProFormDependency>
    </ModalForm>
  );
};

export default MenuForm;
