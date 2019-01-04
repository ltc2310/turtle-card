import React from 'react';
import { Card, Avatar, Row, Col } from 'antd';

export class Player extends React.Component {

    renderContent = () => {
        const { cards, showCardContent } = this.props;
       if(showCardContent === ''){
           return null;
       }else if(showCardContent === 'drawed'){
           return (
            <div style={{paddingTop : 10}}>
                <Row>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card  style={{ width: 50 }}/>
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card style={{ width: 50 }}/>
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Card style={{ width: 50 }}/>
                    </Col>
                </Row>             
            </div>
           );
       }else if(showCardContent === 'showed' && cards){
        return (
            <div style={{paddingTop : 10}}>
             <Row>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <img src={cards[0].image } alt='card-1'  style={{ width: 50 }}/>
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <img src={cards[1].image}  alt='card-2' style={{ width: 50 }}/>
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <img src={cards[2].image}  alt='card-3'  style={{ width: 50 }}/>
                    </Col>
                </Row>   
            </div>
        );
       }
    }

    render(){
        const { title, style } = this.props;
        return (
            <Card
            title={title}
            style={style}
            >
                <Avatar size={64} icon="user" />
                { this.renderContent() }
          </Card>
        );
    }
}
