interface Menu {
  menuId: number;
  menuName: string;
  parentId: number;
  path: string;
  component: string | null;
  icon: string;
  status: number;
  perms: string;
  visible: number;
  children?: Menu[];
}

// Ant Design Pro 动态菜单配置接口
interface AntdMenu {
  name: string;
  path: string;
  icon?: string;
  routes?: AntdMenu[]; // 子菜单
  hideInMenu?: boolean; // 控制是否在菜单中隐藏
}

// 转换树形菜单为 Ant Design Pro 的动态菜单配置
export function convertToAntdMenu(menuTree: Menu[]): AntdMenu[] {
  return menuTree.map((menu) => {
    const antdMenu: AntdMenu = {
      name: menu.menuName,
      path: menu.path,
      icon: menu.icon || undefined, // 如果有图标，使用图标
      hideInMenu: !menu.visible, // 默认不隐藏
    };

    // 如果有子菜单，递归处理
    if (menu.children && menu.children.length > 0) {
      antdMenu.routes = convertToAntdMenu(menu.children);
    }

    // 如果菜单状态为禁用，设置隐藏
    if (menu.status === 0) {
      antdMenu.hideInMenu = true;
    }

    return antdMenu;
  });
}
