import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { User } from '@/api/user'

// define your typings for the store state 定义state类型
export interface State {
  count: number
  user: User | null
}

// define injection key 定义注入的key
export const key: InjectionKey<Store<State>> = Symbol()

// 创建store容器，容器中通过泛型只听State的类型
export const store = createStore<State>({
  state: { // 必须符合泛型参数 State 类型要求
    count: 0,
    // 默认从本地存储获取，如果没有给一个字符串的null，不然会有类型错误
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
  },

  mutations: {
    // 设置user
    setUser (state, user: User) {
      state.user = user
      // 持久化到本地存储
      window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  }
})

export function useStore () {
  // 这里传入那login/index.vue就不用传key了
  return baseUseStore(key)
}
