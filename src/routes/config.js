export default {
    menus: [ // 菜单相关路由
        // { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        { key: '/app/datas', title: '产品数据', icon: 'copy',
          subs: [
              // {
              //   key: '/app/datas/show', title: "产品" ,component: 'Datas'
              // },
              {
                key: '/app/datas/detail', title: "客户信息", component: 'SuperDetali'
              }
          ] 
        }
    ]    
}