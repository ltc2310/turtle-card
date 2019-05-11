import React from 'react';
import { Row, Col } from 'antd';


export class HeaderScore extends React.Component {

    render(){
        const { score1, score2, score3, score4 } = this.props;
        return (
            <div className="gutter-example">
            <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <div className="gutter-box">Score Player 1 : </div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div className="gutter-box">Score Player 2 : </div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div className="gutter-box">Score Player 3 : </div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div className="gutter-box">Score Player 4 : </div>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <div className="gutter-box">{score1}</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div className="gutter-box">{score2}</div>
            </Col>
            <Col className="gutter-row" span={6}>
            <div className="gutter-box">{score3}</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div className="gutter-box">{score4}</div>
            </Col>
            </Row>
        </div>
        );
    }
}
