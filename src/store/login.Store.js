//login module

import { makeAutoObservable } from "mobx"
import { http, tokenUtil } from "@/utils"
class LoginStore {

  token = tokenUtil.getToken() || ''

  constructor() {
    makeAutoObservable(this)
  }

  getToken = async ({ mobile, code }) => {
    //调用登录接口
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    console.log(res.data)
    //存入token
    this.token = res.data.token
    //存入localStore
    tokenUtil.setToken(this.token)
  }

}
export default LoginStore