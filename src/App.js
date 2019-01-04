import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Button, Card, Spin, Row, Col } from 'antd';
import  { Player, HeaderScore }  from './components';
import { calculateScore } from './utils/calculateScore';
import { findMaxElementInArray, finIndexOfMaxValueInArray } from './utils/calculatePoint';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0,
      showCardContent: '',
      isDrawForOne: false,
      isDrawForTwo: false,
      isDrawForThree: false,
      isDrawForFour: false,
      round : 1,
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      isEndRound: false,
      highestScore: 0,
      winnerPlayers: [],
    };
  }

  componentDidMount(){
    this.props.getDeckId();
  }

  onShuffleClick = () => {
    const { deckId } = this.props;
    const { count, round } = this.state;
    if(count !== 0){
      alert('We are in game. Can not shuffle')
      return
    }
    if(round === 6){
      alert('The game is ended');
      return
    }
    this.props.shuffleCards(deckId);
    this.setState({
      count : 0,
      showCardContent: '',
      isDrawForOne: false,
      isDrawForTwo: false,
      isDrawForThree: false,
      isDrawForFour: false,
      isEndRound: false
    });
  }

  drawCardForEveryPlayer = () => {
    const { deckId } = this.props;
    const { count } = this.state;
    if(count === 0){
      this.props.drawCardForPlayerOne(deckId);
      this.setState({
        isDrawForOne: true,
      });
    }else if(count === 1){
      this.props.drawCardForPlayerTwo(deckId)
      this.setState({
        isDrawForTwo: true,
      });
    }else if(count === 2){
      this.props.drawCardForPlayerThree(deckId)
      this.setState({
        isDrawForThree: true,
      });
    }else if(count === 3){
      this.props.drawCardForPlayerFour(deckId)
      this.setState({
        isDrawForFour: true,
      });
    }
  }

  onDrawClick = () => {
    const { count, round, isEndRound } = this.state;
    if(round === 6){
      alert('The game is ended');
      return
    }
    if(isEndRound){
      alert(`Round ${round -1} is ended. Please shuffle to continue`);
      return
    }
    if(count > 3 ){
      alert('only draw for 4 players');
    }else{
      this.drawCardForEveryPlayer();
      let newCount = count + 1;
      this.setState({
        count : newCount,
        showCardContent: 'drawed'
      })
    }
  }

  onRevealClick = () => {
    const { round, count, isEndRound } = this.state;

    if(count === 0 && isEndRound){
      alert(`Round ${round -1} is ended. Please shuffle to continue`);
      return
    }

    if(count < 4){
      alert('Please draw card for all players');
      return
    }
    let newRound = round + 1;
    this.setState({
      showCardContent : 'showed',
      round : newRound,
      count: 0,
      isEndRound: true
    });

    this.calculatePointForPlayers();
  }

  calculatePointForPlayers = () => {
    const { playerOneCards, playerTwoCards, playerThreeCards, playerFourCards } = this.props;
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
      round,
      } = this.state;

      if(round === 6){
        const highestScore = findMaxElementInArray([score1, score2, score3, score4]);
        this.setState({
          highestScore
        })
        const winners = finIndexOfMaxValueInArray([score1, score2, score3, score4], highestScore);
        let winnerPlayersArr = []
    
        if(winners.length === 1){
          const winner = winners[0]
          if(winner === 0){
            winnerPlayersArr.push('player 1')
            this.setState({
              winnerPlayers: winnerPlayersArr
            })
          }else if(winner === 1){
            winnerPlayersArr.push('player 2')
            this.setState({
              winnerPlayers: winnerPlayersArr
            })
          }else if(winner === 2){
            winnerPlayersArr.push('player 3')
            this.setState({
              winnerPlayers: winnerPlayersArr
            })
          }else if(winner === 3){
            winnerPlayersArr.push('player 4')
            this.setState({
              winnerPlayers: winnerPlayersArr
            })
          }
        }
      }
  }

  renderContent = () => {
    const { playerOneCards, playerTwoCards, playerThreeCards, playerFourCards } = this.props;
    const { 
      showCardContent,
      isDrawForOne,
      isDrawForTwo,
      isDrawForThree,
      isDrawForFour,
      score1,
      score2, 
      score3, 
      score4,
      round,
      highestScore,
      winnerPlayers
      } = this.state;

    const showCardContentPlayerOne = isDrawForOne ? showCardContent : ''
    const showCardContentPlayerTwo = isDrawForTwo ? showCardContent : ''
    const showCardContentPlayerThree = isDrawForThree ? showCardContent : ''
    const showCardContentPlayerFour = isDrawForFour ? showCardContent : ''

    const cardsOfPlayerOne = showCardContentPlayerOne === 'showed' && playerOneCards;
    const cardsOfPlayerTwo = showCardContentPlayerTwo === 'showed' && playerTwoCards;
    const cardsOfPlayerThree = showCardContentPlayerThree === 'showed' && playerThreeCards;
    const cardsOfPlayerFour = showCardContentPlayerFour === 'showed' && playerFourCards;
    this.getWinnerPlayer();

    const theHightestScore = highestScore > 0 ? highestScore : '';
    const winners = winnerPlayers.length > 0 ? winnerPlayers.toString() : '';

    return (
      <div>
        {
          round === 6 && winners && theHightestScore
          ?
          alert(`Congratulations ${winners} win the game with highest score ${theHightestScore}`)
          :
          null
        }
          <Card
          title='Game Turtle Card'
        >
          <div>
            <HeaderScore
             score1={score1}
             score2={score2}
             score3={score3}
             score4={score4}
             />
          </div>
          <div style={{paddingTop : 20}}>
            <Player
            title='player 1'
            style={{ marginLeft : 400, width : 300 }}
            showCardContent={showCardContentPlayerOne}
            cards={cardsOfPlayerOne} 
            />
            <Row>
              <Col span={8}>
              <Player
                title='player 4'
                style={{ width : 300 }}
                showCardContent={showCardContentPlayerFour}
                cards={cardsOfPlayerFour}  
              />
              </Col>
              <Col span={8} offset={8}>
              <Player 
                title='player 2'
                style={{  width : 300 }}
                showCardContent={showCardContentPlayerTwo}
                cards={cardsOfPlayerTwo}  
              />
              </Col>
            </Row>
            <Player 
            title='player 3'
            style={{ marginLeft : 400, width : 300 }}
            showCardContent={showCardContentPlayerThree}
            cards={cardsOfPlayerThree}  
            />
            
          </div>
          <div style={{paddingTop : 20}}>
    
          <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Button type='primary' onClick={this.onShuffleClick} >Shuffle</Button>
            </Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Button type='primary' onClick={this.onDrawClick} style={{paddingLeft: 10}}>Draw</Button>
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Button type='primary' onClick={this.onRevealClick} style={{paddingLeft: 10}}>Reveal</Button>
            </Col>
          </Row>
          </div>
        </Card>
    </div>
    );
  }
  

  render() {
    const { loading } = this.props;
  
    return (
      <div className='App'>
      {
        loading
        ?
        <div className='spin'>
        <Spin />
        </div>
        :
        <div className='App'>
          {this.renderContent()}
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
