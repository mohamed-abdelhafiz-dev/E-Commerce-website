const xhr = new XMLHttpRequest();
xhr.open("get", "https://supersimplebackend.dev/products/first");
xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
xhr.send();
