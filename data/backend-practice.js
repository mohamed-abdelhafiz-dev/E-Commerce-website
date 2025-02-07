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

// new Promise((resolve, reject) => {
//   xhr.addEventListener("load", () => {
//     if (Array.isArray(JSON.parse(xhr.response))) {
//       resolve("hi");
//     } else {
//       reject("bye");
//     }
//   });
//   xhr.send();
// })
//   .then((x) => {
//     console.log("then" + x);
//   })
//   .catch((x) => {
//     console.log("catch" + x);
//   });
