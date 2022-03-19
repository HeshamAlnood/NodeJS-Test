//const e = require("express");

console.log(`Testing Covid !`);

let hForm = document.querySelector("form");

hForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Suppp Bro This is From Element !");
  let val = document.querySelector("input").value;
  console.log("val");
  console.log(val);
  console.log(`Start Bringing Data`);
  runFetch(val);
  console.log(`finishing Bringing Data`);
});

String.prototype.initCap = function () {
  return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
  });
};

function runFetch(country) {
  if (!country || country.length < 3 || Number.parseInt(country)) {
    console.log(`Country is requierd !`);
    document.getElementById("Error").textContent = `Uncorrect Country`;
    document.getElementById("Success").textContent = "";
    document.getElementById("result").textContent = "";

    return;
  }
  let vlink = `https://covid-api.mmediagroup.fr/v1/cases?country=${country.initCap()}`;
  document.getElementById("result").textContent = "Loading";
  fetch(vlink)
    .then((rsp) => rsp.json())
    .then((data) => {
      if (!data.All) {
        console.log(`Uncorrect Country`);
        document.getElementById("Error").textContent = `Uncorrect Country`;
        document.getElementById("Success").textContent = "";
        document.getElementById("result").textContent = "";
      } else {
        console.log(data.All);
        document.getElementById("Success").textContent = `Finish`;
        document.getElementById("Error").textContent = ``;
        document.getElementById("result").textContent = JSON.stringify(
          data.All
        );
      }
    });
}
