<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="handleSubmit">
            <!-- <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset> -->
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { login } from '@/api/user'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const useLogin = () => {
  // 获得路由
  const router = useRouter()
  const store = useStore()

  const user = reactive({ // 支持类型推断
    email: '',
    password: ''
  })

  const handleSubmit = async () => {
    try {
      const { data } = await login({ user })
      // 成功之后将user传递进去
      store.commit('setUser', data.user)
      // 登录成功之后跳转到首页
      router.push({
        name: 'home'
      })
    } catch (err) {
      console.log('登录失败', err)
    }
  }

  // 返回的内容可以在模板中绑定使用
  return {
    user,
    handleSubmit
  }
}
export default defineComponent({
  name: 'loginPage',
  setup () {
    return {
      // 组合到当前组件中
      ...useLogin()
    }
  }
})
</script>

<style>

</style>
