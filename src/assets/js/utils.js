// export function shuffle(source) {
//   const arr = source.slice();
//   // debugger;
//   for (let i = 0; i < arr.length; i++) {
//     const j = getRandomInt(i);
//     swap(arr, i, j);
//   }
//   return arr;
// }

// function getRandomInt(max) {
//   return Math.floor(Math.random() * (max + 1));
// }

// function swap(arr, i, j) {
//   const t = arr[i];
//   arr[i] = arr[j];
//   arr[j] = t;
// }
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
