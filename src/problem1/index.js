//Using While O(n)
var sum_to_n_a = function (n) {
  let sumResultA = 0;
  while (n > 0) {
    sumResultA += n;
    n--;
  }
  return sumResultA;
};

//Using for loop O(n)
var sum_to_n_b = function (n) {
  let resultSumB = 0;
  for (let i = 1; i <= n; i++) {
    resultSumB += i;
  }
  return resultSumB;
};

//Using Formula O(1)
var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};

console.log("sum_to_n_a: ", sum_to_n_a(5));
console.log("sum_to_n_b: ", sum_to_n_b(5));
console.log("sum_to_n_c: ", sum_to_n_c(5));
