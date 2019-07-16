import React, { Component } from 'react'
import {  PageHeader, Grid, Col, Row, Modal,Nav,NavItem,Tab,ListGroupItem,ListGroup } from 'react-bootstrap'
export default class Notifition extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

 
  render() {


    return (
      <div>
      <PageHeader>
        </PageHeader>
      
          
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
  <Row className="clearfix">
    <Col md={2} mdOffset={1}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="1">寵物登記各項收費項目及標準</NavItem>
        <NavItem eventKey="2">寵物領養登記流程</NavItem>
        <NavItem eventKey="3">領養寵物具備條件</NavItem>
        <NavItem eventKey="4">寵物領回流程</NavItem>
        <NavItem eventKey="5">認養前的十大注意事項</NavItem>
      </Nav>
    </Col>
    <Col md={8}>
      <Tab.Content animation>
        <Tab.Pane eventKey="1"><img src="/assets/p1.jpg"/></Tab.Pane>
        <Tab.Pane eventKey="2">
<ListGroup>
  <ListGroupItem>新登記流程 
寵物登記申請表填寫說明（委託代辦)</ListGroupItem>
  <ListGroupItem> 1. 飼主需填寫委託代辦申請同意書</ListGroupItem>
  <ListGroupItem>2. 代辦人親至登記機構並攜帶： <br/>●委託代辦申請同意書 <br/>● 飼主身分證明文件 <br/>●寵物最近一年內狂犬病預防注射證明文件影本 <br/> 
  ●絕育證明文件影本（寵物未絕育者可免附）<br/>●晶片植入手續費：300元 <br/>●植入晶片臨床診查費：100元 <br/>●寵物登記費： <br/>絕育：0元/隻   未絕育：100元/隻 <br/>●寵物  </ListGroupItem>
  <ListGroupItem>3. 填寫寵物登記/轉讓/補發申請表：  <br/>● 勾選左上角新登記欄  <br/>
● 詳細填寫紅框內之飼主資料及寵物資料所有欄位（晶片號碼免填） <br/> 
● 勾選原飼主/代辦人簽名欄，並於其後簽上代辦人姓名或蓋章  <br/>
● 填寫申請日期 </ListGroupItem>
  <ListGroupItem>4. 將申請表及相關文件交於登記機構受理人，待寵物植入晶片後，由受理人將微晶片條碼標籤黏貼於申請表上，
並填寫寵物登記證上之資料。</ListGroupItem>
  <ListGroupItem> 5. 取得寵物登記證及頸牌、附冊，完成寵物登記手續。

附註：飼主可自行於寵物登記證背面，寵物資料備註欄內，填寫寵物之基本資料或加貼寵物的照片。</ListGroupItem>
</ListGroup></Tab.Pane>
        <Tab.Pane eventKey="3">
<ListGroup>
  <ListGroupItem>我適合養寵物嗎? 
基本上，飼養寵物和照顧小孩一樣，是必須付出愛心與耐心的，同時，必須有充裕的時間與金錢來照顧牠，以提
供良好的生活環境與品質，如此寵物才可以健康地成長，使人和寵物之間的情感聯繫更加親密。</ListGroupItem>
  <ListGroupItem>一、 飼養各種寵物的基本消費 
(1) 犬與貓 
寵物登記與晶片註記、項圈、狗鍊、梳子、玩具、碗盤、睡墊、照顧指南。 
(2) 兩棲類：爬蟲類與魚類 
水族箱、濾水器、保溫器、植物、照顧指南。 
(3) 鳥類與嚙齒類 
籠子、墊料、棲木、碗盤、玩具、照顧指南</ListGroupItem>
  <ListGroupItem>二、 飼養寵物的持續性花費 
飼糧、墊料、貓砂、梳理、修剪毛髮、定期健康檢查、生病或受傷時的醫藥費、預防注射與其他醫療費用。</ListGroupItem>
  <ListGroupItem>以上列出的是我們對寵物『最基本』所需花費的時間，除此之外，畜主應多付出時間來陪伴與照顧寵物，
以建立畜主與寵物間良好的關係。</ListGroupItem>
  <ListGroupItem>如何選擇自己喜歡的寵物?
在飼養寵物之前，可依照以下幾項主觀或客觀的條件來選擇適當的寵物：</ListGroupItem>
  <ListGroupItem>一、 可以接受的體型大小 
通常體型較小的狗需要較小的空間，較少的食物量，於是也就需要較少的花費。體型大的狗通常需要較大的
生活空間與較多的食物量，通常為較佳的守衛犬，同時最好有足夠的時間帶牠出去運動。根據狗狗的大小常見品種如下： <br/>
(1) 迷你型：通常體重在5公斤以內，例如吉娃娃、瑪爾濟斯、博美狗等。 <br/>
(2) 小 型   ：通常體重在5~15公斤左右，包括米格魯獵兔犬、標準臘腸狗，雪納瑞等。 <br/>
(3) 中 型   ： 體重在15~30公斤左右，包括可卡犬、鬆獅犬等。 <br/>
(4) 大 型    ：體重約在30~45公斤左右，包括德國狼犬、黃金獵犬、洛威拿、秋田犬等。 <br/>
(5) 超大型 ：體重超過45公斤以上，例如大丹狗、聖伯納狗等。</ListGroupItem>
 

</ListGroup></Tab.Pane>
        <Tab.Pane eventKey="4"><img src="/assets/p2.jpg"/></Tab.Pane>
        <Tab.Pane eventKey="5"><img src="/assets/p3.jpg"/></Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>;
         
      </div>
      )
    }
  }