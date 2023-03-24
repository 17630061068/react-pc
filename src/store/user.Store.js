import { http } from '@/utils'
import { makeAutoObservable } from 'mobx'

class UserStore {
  useInfo = {}
  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = () => {
    http.post('', {})
  }
}

export default UserStore