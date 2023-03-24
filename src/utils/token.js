//封装localStore存取token
const key = 'token'

class TokenUtil {

  setToken = (value) => {
    return window.localStorage.setItem(key, value)
  }

  getToken = () => {
    return window.localStorage.getItem(key)
  }

  removeToken = () => {
    return window.localStorage.removeItem(key)
  }
}

const tokenUtil = new TokenUtil()

export { tokenUtil }