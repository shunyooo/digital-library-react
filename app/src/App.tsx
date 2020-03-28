import React from 'react';
// 使うコンポーネントをインポート
import { Layout, Button, Typography, Row, Col } from 'antd'; 
import './App.css';

// 一部の要素は各コンポーネントを元に定義する必要がある
// 詳しくはドキュメントのソースコードを見ればわかる
const { Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Layout style={{textAlign: "center" }}>
        <Content style={{ margin: "60px 16px" }}>
          <Title>Digital Library React</Title>
          <Row style={{ margin: "60px 16px" }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Title level={3}>セットアップ</Title>
              <Button type="primary">Link</Button>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Title level={3}>試してみる</Title>
              <Button type="danger">Link</Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
