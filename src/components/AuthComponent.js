
//高阶组件： 把一个组件当成另外一个组件的参数传入

const { tokenUtil } = require("@/utils")
const { Navigate } = require("react-router-dom")

//通过一定的判断 ，返回新的组件
function AuthComponent ({ children }) {
  const token = tokenUtil.getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace />
  }
}

export default AuthComponent