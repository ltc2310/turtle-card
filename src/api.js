import axios from 'axios';

export const getDeckIdApi = () => {
    return axios({
      method: 'get',
      url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    });
  }
 
export const reshuffleCardsApi = deckId => {
    return axios({
      method: 'get',
      url: `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
    });
  }

export const drawCardsApi = deckId => {
    return axios({
      method: 'get',
      url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`
    });
  }

