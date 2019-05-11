export const findMaxElementInArray = ( arrayInt ) => {
    let largest = arrayInt[0];
   for (let i = 0; i < arrayInt.length; i++) {
        if (largest < arrayInt[i] ) {
            largest = arrayInt[i];
        }
    }
    return largest;
}

export const finIndexOfMaxValueInArray = (arrayInt, maxValue) => {
    let arrayIndex = []
    for (let i = 0; i < arrayInt.length; i++) {
        if (arrayInt[i] === maxValue ) {
           arrayIndex.push(i);
        }
    }
    return arrayIndex
}
