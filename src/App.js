import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Button, Card, Spin, Row, Col, Modal } from 'antd';
import  { Player, HeaderScore }  from './components';
import { calculateScore } from './utils/calculateScore';
import { findMaxElementInArray, finIndexOfMaxValueInArray } from './utils/calculatePoint';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showCardContent: '',
      round : 1,
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      isEndRound: false,
      highestScore: 0,
      winnerPlayers: [],
      isDrawed: false,
      isEndGame: false,
    };
  }

  resetState = () => {
    this.setState({
      showCardContent: '',
      round : 1,
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      isEndRound: false,
      highestScore: 0,
      winnerPlayers: [],
      isDrawed: false,
      isEndGame: false,
    })
  }

  componentDidMount(){
    this.props.getDeckId();
  }

  onShuffleClick = () => {
    const { deckId } = this.props;
    const { isEndGame, isDrawed } = this.state;

    if(isDrawed){
      alert('We are in game!');
      return
    }

    if(isEndGame){
      alert('The game is ended! Click show result to find the winner');
      return
    }
    this.props.shuffleCards(deckId);
    this.setState({
      showCardContent: '',
      isEndRound: false
    });
  }


  onDrawClick = () => {
    const { deckId  } = this.props;
    const { isEndRound, isDrawed, isEndGame } = this.state;

    if(isEndGame){
      alert('The game is ended! Click show result to find the winner');
      return
    }
    
    if(isDrawed){
      alert('Drawed for all players. Please click reveal button to continue');
      return
    }

    if(isEndRound){
      alert('Please shuffle before start new round');
      return
    }
    this.props.drawCardForPlayerOne(deckId);
    this.props.drawCardForPlayerTwo(deckId)
    this.props.drawCardForPlayerThree(deckId)
    this.props.drawCardForPlayerFour(deckId)

    this.setState({
        showCardContent: 'drawed',
        isDrawed: true,
    })
  }

  onRevealClick = () => {
    const { round, isEndRound, isDrawed, isEndGame } = this.state;

    if(round === 5){
      this.setState({
        isEndGame : true
      });
    }

    if(isEndGame){
      alert('The game is ended! Click show result to find the winner');
      return
    }

    if(!isDrawed){
      alert('Please draw cards for all players');
      return;
    }

    if(isEndRound){
      alert(`Round ${round -1} is ended. Please shuffle to continue`);
      return
    }

    let newRound = round + 1;
    this.setState({
      showCardContent : 'showed',
      round : newRound,
      isEndRound: true,
      isDrawed: false
    });

    this.calculatePointForPlayers();   
  }

  calculatePointForPlayers = () => {
    const { playerOneCards, playerTwoCards, playerThreeCards, playerFourCards} = this.props;
    const {score1, score2, score3, score4 } = this.state;

    const playerOneScore = calculateScore(playerOneCards[0].value, playerOneCards[1].value, playerOneCards[2].value);
    const playerTwoScore = calculateScore(playerTwoCards[0].value, playerTwoCards[1].value, playerTwoCards[2].value);
    const playerThreeScore = calculateScore(playerThreeCards[0].value, playerThreeCards[1].value, playerThreeCards[2].value);
    const playerFourScore = calculateScore(playerFourCards[0].value, playerFourCards[1].value, playerFourCards[2].value);

    const arrayScore = [playerOneScore , playerTwoScore, playerThreeScore, playerFourScore];

    const maxScore = findMaxElementInArray(arrayScore);
    const arrIndexMaxScore = finIndexOfMaxValueInArray(arrayScore, maxScore);

    if(arrIndexMaxScore.length === 1){
      const winerIndex = arrIndexMaxScore[0];
      if(winerIndex === 0){
        this.setState({
          score1: score1 + 20000
        })
      }else if(winerIndex === 1){
        this.setState({
          score2: score2 + 20000
        })
      }else if(winerIndex === 2){
        this.setState({
          score3: score3 + 20000
        })
      }else if(winerIndex === 3){
        this.setState({
          score4: score4 + 20000
        })
      }
    }else{
      const newScore = 20000/(arrIndexMaxScore.length);
      arrIndexMaxScore.forEach(i => {
        if(i === 0){
          this.setState({
            score1: score1 + newScore
          })
        }else if(i === 1){
          this.setState({
            score2: score2 + newScore
          })
        }else if(i === 2){
          this.setState({
            score3: score3 + newScore
          })
        }else if(i === 3){
          this.setState({
            score4: score4 + newScore
          })
        }
      });
    }
  }

  getWinnerPlayer = () => {
    const { 
      score1,
      score2, 
      score3, 
      score4,
      isEndGame
      } = this.state;

    if(isEndGame){
      const highestScore = findMaxElementInArray([score1, score2, score3, score4]);

      const winners = finIndexOfMaxValueInArray([score1, score2, score3, score4], highestScore);

      let winnerPlayersArr = []

      if(winners.length > 0){
        winners.forEach(i => {
          if(i === 0){
            winnerPlayersArr.push('player 1')
          }else if(i === 1){
            winnerPlayersArr.push('player 2')
          }else if(i === 2){
            winnerPlayersArr.push('player 3')
          }else if(i === 3){
            winnerPlayersArr.push('player 4')
          }
        });
        this.setState({
          winnerPlayers: winnerPlayersArr,
          highestScore
        }, this.showModal )
      }
    }
  }

  onShowResult = () => {
    const {isEndGame} = this.state;
    if(!isEndGame){
      alert('We are in game. You can see the result after 5 round');
      return
    }
    this.getWinnerPlayer();
  }

  showModal = () => {
    const {  
      highestScore,
      winnerPlayers,
      isEndGame,
     } = this.state;

     let that = this;

     if(isEndGame && highestScore > 0 && winnerPlayers.length > 0){

      const theHightestScore = highestScore > 0 ? highestScore : '';
      const winners = winnerPlayers.length > 0 ? winnerPlayers.toString() : '';
  
      Modal.info({
        title: `Congratulations ${winners} win the game with highest score ${theHightestScore}`,
        onOk(){
          that.resetState()
        },
      }); 
    }
  }

  renderContent = () => {
    const { playerOneCards, playerTwoCards, playerThreeCards, playerFourCards } = this.props;
    const { 
      showCardContent,
      score1,
      score2, 
      score3, 
      score4,
    } = this.state;

    const cardsOfPlayerOne = showCardContent === 'showed' && playerOneCards;
    const cardsOfPlayerTwo = showCardContent === 'showed' && playerTwoCards;
    const cardsOfPlayerThree = showCardContent === 'showed' && playerThreeCards;
    const cardsOfPlayerFour = showCardContent === 'showed' && playerFourCards;
   
    return (
      <React.Fragment>
          <Card
          title='Game Turtle Card'
        >
          <React.Fragment>
            <HeaderScore
             score1={score1}
             score2={score2}
             score3={score3}
             score4={score4}
             />
          </React.Fragment>
          <div style={{paddingTop : 20}}>
          <div className="gutter-example">
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box">
                <Player
                  title='player 1'
                  style={{ marginLeft : 10, width : 300 }}
                  showCardContent={showCardContent}
                  cards={cardsOfPlayerOne} 
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box">
                <Player 
                title='player 2'
                style={{  width : 300, paddingLeft: 10 }}
                showCardContent={showCardContent}
                cards={cardsOfPlayerTwo}  
                />
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box">
                <Player 
                  title='player 3'
                  style={{ width : 300, paddingLeft: 10 }}
                  showCardContent={showCardContent}
                  cards={cardsOfPlayerThree}  
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box">
                <Player
                title='player 4'
                style={{width : 300, paddingLeft: 10 }}
                showCardContent={showCardContent}
                cards={cardsOfPlayerFour}  
                />
                </div>
              </Col>
            </Row>
          </div>
          </div>
          <div style={{paddingTop : 20 }}>
            <div style={{paddingLeft: 10, display : 'inline-block'}}>
            <Button type='primary' onClick={this.onShuffleClick} >Shuffle</Button>
            </div>
            <div style={{paddingLeft: 10, display : 'inline-block'}}>
            <Button type='primary' onClick={this.onDrawClick} >Draw</Button>
            </div>
            <div style={{paddingLeft: 10, display : 'inline-block'}}>
            <Button type='primary' onClick={this.onRevealClick}>Reveal</Button>
            </div>
            <div style={{paddingLeft: 10, display : 'inline-block'}}>
            <Button type='primary' onClick={this.onShowResult} >Show Result</Button>
            </div>
          </div>
        </Card>
    </React.Fragment>
    );
  }
  

  render() {
    const { loading } = this.props;
    const content = this.renderContent();
  
    return (
      <div className='App'>
      {
        loading
        ?
        <div className='spin'>
        <Spin >
        {this.renderContent()}
        </Spin>
        </div>
        :
        <div className='App'>
          {content}
        </div>
      }
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    loading: state.loading,
    deckId: state.deck_id,
    error: state.error,
    playerOneCards: state.playerOneCards,
    playerTwoCards: state.playerTwoCards,
    playerThreeCards: state.playerTreeCards,
    playerFourCards: state.playerFourCards,
    state : state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDeckId: () => dispatch({ type: 'GET_DECK_ID' }),
    shuffleCards: ( deckId ) => dispatch({ type: 'RE_SHUFFLE_CARDS', deckId }),
    drawCardForPlayerOne: ( deckId ) => dispatch({ type: 'DRAW_CARDS_ONE', deckId }),
    drawCardForPlayerTwo: ( deckId ) => dispatch({ type: 'DRAW_CARDS_TWO', deckId }),
    drawCardForPlayerThree: ( deckId ) => dispatch({ type: 'DRAW_CARDS_THREE', deckId }),
    drawCardForPlayerFour: ( deckId ) => dispatch({ type: 'DRAW_CARDS_FOUR', deckId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
