import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'

const { Option } = Select

const Publish = () => {

  const navigate = useNavigate()

  const { channelStore } = useStore()

  //使用useRef声明一个暂存仓库
  const fileListRef = useRef()

  //存放上传图片的列表
  const [fileList, setFileList] = useState([])

  const onUploadChange = ({ fileList }) => {
    const formatList = fileList.map(item => {
      if (item.response) {
        return item.response.data.url
      } else {
        return item
      }
    })

    setFileList(formatList)

    //上传图片时把图片列表暂存
    fileListRef.current = formatList
  }

  const [imgCount, setImageCount] = useState(1)

  const radioChange = (e) => {

    setImageCount(e.target.value)

    const fileList = fileListRef.current ? fileListRef.current : []
    if (e.target.value === 1) {
      setFileList(
        [fileList[0]]
      )
    } else if (e.target.value === 3) {
      setFileList(
        fileList
      )
    }


  }

  //提交表单
  const onFinish = async (values) => {
    console.log(fileList)
    const { channel_id, content, title, type } = values
    const params = {
      channel_id: channel_id,
      content: content,
      title: title,
      type: type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    if (id) {
      await http.put(`/mp/articles/${id}?draft=false`, params)
    } else {
      await http.post('/mp/articles?draft=false', params)
    }
    navigate('/article')
    message.success('发布成功')

  }

  //编辑功能
  //文案适配
  const [params] = useSearchParams()
  const id = params.get('id')

  const formRef = useRef()
  //数据回填 id调用接口 1.表单回填 2.暂存列表 3.Upload组件fileList
  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/mp/articles/${id}`)
      //表单数据回填
      formRef.current.setFieldsValue({
        ...res.data, type: res.data.cover.type
      })
      //调用setFileList方法回填upload
      setFileList(
        res.data.cover.images.map(
          url => {
            return { url }
          }
        )
      )
      //暂存列表
      fileListRef.current = res.data.cover.images.map(
        url => {
          return { url }
        }
      )

    }
    if (id) {
      loadDetail()
    }
  }, [id])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '编辑文章' : '发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          ref={formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(item =>
                <Option value={item.id}>{item.name}</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )

            }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? '编辑' : '发布'}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish