//el describe es llamado test suite, y dentro de ellos hay multiples test cases

// const sumPositiveNumbers =(num1,num2)=>{
// return num1+num2
// }

//refactor

export const sumPositiveNumbers = (num1, num2) => {
  if (num1 < 0 || num2 < 0) {
    throw new Error("one of the numbers is negative")
  }
  return num1 + num2
}
