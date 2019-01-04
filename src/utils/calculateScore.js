const checkCard = (card) => {
    if(card === 'JACK' || card === 'QUEEN' || card === 'KING'){
        return 10;
    }else if(card === 'ACE'){
        return 1;
    }else if(card === '10'){
        return 0;
    }else{
        return parseInt(card);
    }
}

export const calculateScore = (cardOne, cardTwo, cardThree) => {
   const scoreCardOne = checkCard(cardOne);
   const scoreCardTwo = checkCard(cardTwo);
   const scoreCardThree = checkCard(cardThree);
   
   const sumScore = scoreCardOne + scoreCardTwo + scoreCardThree;

   if(sumScore === 30){
      return 30; 
   }else{
       return sumScore % 10 ;
   }
}