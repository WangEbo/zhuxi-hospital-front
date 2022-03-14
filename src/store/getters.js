const getters = {
  config: state=> state.app.config,
  
  menus: state=> state.menus.menus,
  curLevel1Menu: state=> state.menus.curLevel1Menu,
  curMenu: state=> state.menus.curMenu,
  menuPath: state=> state.menus.menuPath,

};
export default getters;
