const GET_DECK_ID = 'GET_DECK_ID';
const GET_DECK_ID_SUCCESS = 'GET_DECK_ID_SUCCESS';
const GET_DECK_ID_FAIL = 'GET_DECK_ID_FAIL';

const RE_SHUFFLE_CARDS = 'RE_SHUFFLE_CARDS';
const RE_SHUFFLE_CARDS_SUCCESS = 'RE_SHUFFLE_CARDS_SUCCESS';
const RE_SHUFFLE_CARDS_FAIL = 'RE_SHUFFLE_CARDS_FAIL';

const DRAW_CARDS_ONE = 'DRAW_CARDS';
const DRAW_CARDS_ONE_SUCCESS = 'DRAW_CARDS_ONE_SUCCESS';
const DRAW_CARDS_ONE_FAIL = 'DRAW_CARDS_ONE_FAIL';

const DRAW_CARDS_TWO = 'DRAW_CARDS_TWO';
const DRAW_CARDS_TWO_SUCCESS = 'DRAW_CARDS_TWO_SUCCESS';
const DRAW_CARDS_TWO_FAIL = 'DRAW_CARDS_TWO_FAIL';

const DRAW_CARDS_THREE = 'DRAW_CARDS_THREE';
const DRAW_CARDS_THREE_SUCCESS = 'DRAW_CARDS_THREE_SUCCESS';
const DRAW_CARDS_THREE_FAIL = 'DRAW_CARDS_THREE_FAIL';

const DRAW_CARDS_FOUR = 'DRAW_CARDS_FOUR';
const DRAW_CARDS_FOUR_SUCCESS = 'DRAW_CARDS_FOUR_SUCCESS';
const DRAW_CARDS_FOUR_FAIL = 'DRAW_CARDS_FOUR_FAIL';

const initialState = {
  loading: false,
  success: false,
  shuffled: false,
  deck_id: '',
  error: '',
  playerOneCards: [],
  playerTwoCards: [],
  playerTreeCards: [],
  playerFourCards: [] 
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DECK_ID:
      return { ...state, loading: true };
    case GET_DECK_ID_SUCCESS:
      return { ...state, loading: false, deck_id : action.data.deck_id };
    case GET_DECK_ID_FAIL:
      return { ...state, loading: false, error : action.error };
    case RE_SHUFFLE_CARDS:
      return { ...state, loading: true };
    case RE_SHUFFLE_CARDS_SUCCESS:
      return { ...state, loading: false, deck_id : action.data.deck_id };
    case RE_SHUFFLE_CARDS_FAIL:
      return { ...state, loading: false, error : action.error };
    case DRAW_CARDS_ONE:
      return { ...state, loading: true };
    case DRAW_CARDS_ONE_SUCCESS:
      return { ...state, playerOneCards : action.data };
    case DRAW_CARDS_ONE_FAIL:
      return { ...state, loading: false, error : action.error };
    case DRAW_CARDS_TWO:
      return { ...state, loading: true };
    case DRAW_CARDS_TWO_SUCCESS:
      return { ...state, playerTwoCards : action.data };
    case DRAW_CARDS_TWO_FAIL:
      return { ...state, loading: false, error : action.error };
    case DRAW_CARDS_THREE:
      return { ...state, loading: true };
    case DRAW_CARDS_THREE_SUCCESS:
      return { ...state, playerTreeCards : action.data };
    case DRAW_CARDS_THREE_FAIL:
      return { ...state, loading: false, error : action.error };
    case DRAW_CARDS_FOUR:
      return { ...state, loading: true };
    case DRAW_CARDS_FOUR_SUCCESS:
      return { ...state, loading: false, playerFourCards : action.data };
    case DRAW_CARDS_FOUR_FAIL:
      return { ...state, loading: false, error : action.error };
    default:
      return state;
  }
}