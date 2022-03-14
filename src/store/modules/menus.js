import { getMenu } from "@/api/global";

const menus = {
  state: {
    menus: [{}],

    curLevel1Menu: {},
    curMenu: {},
    menuPath: [{}],
  },
  mutations: {
    SetMenus: (state, menus) => {
      state.menus = menus
    },
    SetcurLevel1Menu(state, curLevel1Menu){
      state.curLevel1Menu = curLevel1Menu
    },
    SetCurMenu(state, curMenu){
      state.curMenu = curMenu
    },
    SetMenuPath(state, menuPath){
      state.menuPath = menuPath
    }
  },
  actions: {
    CacheMenus({ commit }, menus) {
      commit('SetMenus', menus)
    },
  }
}

export default menus
