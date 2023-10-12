import {createStore} from "vuex";
import sample from './modules/sample';
import menu from './modules/menu';
import locale from './modules/locale';
import project from './modules/project';
import user from './modules/user';
import code from './modules/code';
import createPersistedState from "vuex-persistedstate";

export default createStore({
        modules: {
            user,
            locale,
            sample,
            menu,
            project,
            code,

        },
        state: {},
        getters: {},
        mutations: {},
        actions: {},
        plugins: [createPersistedState()],
    }
);
