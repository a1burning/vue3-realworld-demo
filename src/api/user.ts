import { request } from '../utils/request'

// 设置一下login中data的类型，不然会报错，如果传入的data不是这个类型，就会报错
// 定义接口 登录输入类型
interface LoginInput {
  user: {
    email: string,
    password: string
  }
}

// 定义接口，登录返回类型User
export interface User {
  email: string
  token: string
  image: string
  bio: string
  username: string
}
// 给返回值也定义类型，不然返回的内容是any，没有类型推断
// 定义接口，登录返回类型
interface LoginPayload {
  // 里面的user是User类型
  user: User
}

// 输入的参数data定义类型LoginInput
export const login = (data: LoginInput) => {
  // 调用post方法的时候设置一个泛型，把返回的内容设置成LoginPayload类型
  return request.post<LoginPayload>('/api/users/login', data)
}
