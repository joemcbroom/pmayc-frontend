import { reactive, readonly } from 'vue'

export const store = reactive({
    darkMode: false,
})

const methods = {
    setDarkMode(value: boolean) {
        store.darkMode = value;
        localStorage.setItem('theme', store.darkMode ? 'dark' : '')
        document.documentElement.classList.toggle('dark', store.darkMode)
    }
}

const getters = {
    darkMode: () => store.darkMode
}

export default {
    store: readonly(store),
    methods,
    getters,
}