const types = {
  SET_LOCALE: '@locale/SET_LOCALE'
}

export {
  types as localeTypes
}

export default {
  namespaced: true,
  state: {
    locale: ''
  },

  getters: {
    locale (state) {
      return state.locale
    }
  },

  mutations: {
    [types.SET_LOCALE] (state, payload) {
      state.locale = payload.locale
    }
  },

  actions: {
    async setLocale ({ commit }, { locale }) {
      commit(types.SET_LOCALE, {
        locale
      })

      return null
    }
  }
}
