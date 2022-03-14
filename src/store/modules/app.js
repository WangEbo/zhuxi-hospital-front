import { getConfig } from "@/api/global";

const app = {
  state: {
    config: {},

  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SetConfig(state, config){
      state.config = config
    },
    
  },
  actions: {
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    GetConfig({ commit }, config){
      getConfig().then(res=> {
        commit('SetConfig', res.data)
      })
    },
    
  }
}

export default app
