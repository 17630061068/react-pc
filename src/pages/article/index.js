import { useNavigate, Link } from 'react-router-dom'
import {
  Card,
  Breadcrumb,
  Table,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Tag,
  Space
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {

  const { channelStore } = useStore()

  const navigate = useNavigate()

  //文章列表管理
  const [listVo, setListVo] = useState({
    count: 0,
    list: [{

    }]
  })
  //文章参数管理
  const [params, setParams] = useState({
    page: 1,
    pre_page: 10
  })

  useEffect(() => {
    const loadArticleList = async () => {
      const res = await http.get('/mp/articles', {
        params
      })
      setListVo({
        count: res.data.total_count,
        list: res.data.results
      })
    }
    loadArticleList()
  }, [params])

  //删除功能
  const delArticle = async (data) => {

    console.log(data)
    await http.delete(`/mp/articles/${data.id}`)
    setParams({
      ...params,
      page: 1
    })
  }

  //编辑功能
  const goPublish = async (data) => {

    navigate(`/publish?id=${data.id}`)

  }


  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        const image = cover && cover.images && cover.images[0]
        return <img src={image || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined
                onClick={() => { goPublish(data) }}
              />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined
                onClick={() => delArticle(data)}
              />}
            />
          </Space>
        )
      }
    }
  ]

  const onFinish = (values) => {
    const { status, channel_id, date } = values
    const _params = {}
    if (status !== -1) {
      _params.status = status
    }
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }

    setParams({
      ...params,
      ..._params
    })
  }

  const pageChange = (page) => {
    setParams(
      {
        ...params,
        page
      }
    )
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">"
            items={[
              {
                'title': <Link to="/home">首页</Link>
              }, {
                'title': '内容管理'
              }
            ]}
          />
        }

        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: -1 }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelStore.channelList.map(item =>
                <Option value={item.id}>{item.name}</Option>
              )}

            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${listVo.count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={listVo.list}
          pagination={
            {
              current: params.page,
              pageSize: params.pre_page,
              total: listVo.count,
              onChange: pageChange
            }
          }
        />
      </Card>
    </div>
  )
}

export default Article