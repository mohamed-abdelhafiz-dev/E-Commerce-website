// //XMLHttpRequest
// /*
// const xhr = new XMLHttpRequest();
// xhr.open("get", "https://supersimplebackend.dev/products/first");
// xhr.addEventListener("load", () => {
//   console.log(xhr.response);
// });
// xhr.send();
// */

// //promises

// const xhr = new XMLHttpRequest();
// xhr.open("get", "https://supersimplebackend.dev/products");

// const x = new Promise((resolve, reject) => {
//   xhr.addEventListener("load", () => {
//     resolve();
//   });
//   xhr.send();
// }).then(() => {
//   console.log(Date.now());
// });

// console.log(
//   x.catch(() => {
//     console.log(Date.now());
//   })
// );
