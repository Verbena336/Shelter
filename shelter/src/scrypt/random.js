export const random = function(arr, length) {
   const array = [0, 1, 2, 3, 4, 5, 6, 7];
   let freshCards = array.filter((num) => !arr.includes(num));
   let set = new Set();
   while (set.size < length) {
     set.add(freshCards[Math.floor(Math.random() * freshCards.length)]);
   }
   return Array.from(set);
}