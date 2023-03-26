import { unstable_HistoryRouter as HistoryRouter, BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import GeekLayout from '@/pages/layout'
import Login from '@/pages/login'
import AuthComponent from './components/AuthComponent'
import Publish from './pages/publish'
import Article from './pages/article'
import Home from './pages/home'
import { history } from './utils'

function App () {
  return (
    //路由配置
    <HistoryRouter history={history}>
      <div className='App'>
        <Routes>
          {/* 创建路由path和组件对应关系 */}
          <Route path='/' element={
            // layout需要健全处理
            <AuthComponent>
              <GeekLayout />
            </AuthComponent>
          } >
            <Route index element={<Home />} />
            <Route path='article' element={<Article />} />
            <Route path='publish' element={<Publish />} />
          </Route>
          <Route path='/login' element={
            <Login />
          } ></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
