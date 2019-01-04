import { takeLatest, call, put } from 'redux-saga/effects';
import { getDeckIdApi, reshuffleCardsApi, drawCardsApi } from './api';

export function* watcherSaga() {
  yield takeLatest('GET_DECK_ID', getDeckId);
  yield takeLatest('RE_SHUFFLE_CARDS', reshuffleCards);
  yield takeLatest('DRAW_CARDS_ONE', drawCardOne);
  yield takeLatest('DRAW_CARDS_TWO', drawCardTwo);
  yield takeLatest('DRAW_CARDS_THREE', drawCardThree);
  yield takeLatest('DRAW_CARDS_FOUR', drawCardFour);
}

function* getDeckId() {
  const response = yield call(getDeckIdApi);
  if(response.data && response.status){
   yield put({ type: 'GET_DECK_ID_SUCCESS', data : response.data });
  }else{
    yield put({ type: 'GET_DECK_ID_FAIL', error : response.error });
  }
}

function* reshuffleCards( { deckId } ) {
  const response = yield call(reshuffleCardsApi, deckId);
  if(response.data && response.status){
   yield put({ type: 'RE_SHUFFLE_CARDS_SUCCESS', data : response.data });
  }else{
    yield put({ type: 'RE_SHUFFLE_CARDS_FAIL', error : response.error });
  }
}



function* drawCardOne( { deckId } ) {
  const response = yield call(drawCardsApi, deckId);

  if(response.data && response.status){
    yield put({ type: 'DRAW_CARDS_ONE_SUCCESS', data : response.data.cards });
  }else{
    yield put({ type: 'DRAW_CARDS_ONE_FAIL', error : response.error });
  }
}

function* drawCardTwo( { deckId } ) {
  const response = yield call(drawCardsApi, deckId);

  if(response.data && response.status){
    yield put({ type: 'DRAW_CARDS_TWO_SUCCESS', data : response.data.cards });
  }else{
    yield put({ type: 'DRAW_CARDS_TWO_FAIL', error : response.error });
  }
}

function* drawCardThree( { deckId } ) {
  const response = yield call(drawCardsApi, deckId);

  if(response.data && response.status){
    yield put({ type: 'DRAW_CARDS_THREE_SUCCESS', data : response.data.cards });
  }else{
    yield put({ type: 'DRAW_CARDS_THREE_FAIL', error : response.error });
  }
}

function* drawCardFour( { deckId } ) {
  const response = yield call(drawCardsApi, deckId);

  if(response.data && response.status){
    yield put({ type: 'DRAW_CARDS_FOUR_SUCCESS', data : response.data.cards });
  }else{
    yield put({ type: 'DRAW_CARDS_FOUR_FAIL', error : response.error });
  }
}