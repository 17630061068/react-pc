import { Button, Card, Checkbox, Form, Input, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { loginStore } = useStore()

  const navigate = useNavigate()

  async function onFinish (value) {

    try {
      await loginStore.getToken({

        mobile: value.telephone,

        code: value.captcha

      })

      // 跳转首页
      navigate('/', { replace: true })

      message.success('login success')

    } catch (e) {

      message.error('login fail')
    }

  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          validateTrigger={['onBlur']}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="telephone"
            rules={[
              {
                required: true,
                message: 'Please input your telephone!',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式不对',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: 'Please input your 验证码!',
              }, {
                len: 6,
                message: '请输入六位验证码'
              }
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login