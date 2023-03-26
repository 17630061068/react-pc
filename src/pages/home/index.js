import Bar from '@/components/bar'


function Home () {

  return (
    <div>
      {/* 渲染Bar组件 */}
      <Bar title='主流框架满意使用度' xData={['react', 'vue', 'angular']} yData={[100, 80, 50]} style={{ width: '500px', height: '400px' }} />
      <Bar title='Java主流框架' xData={['spring', 'netty', 'springBoot']} yData={[100, 99, 90]} style={{ width: '300px', height: '200px' }} />
    </div>
  )
}

export default Home