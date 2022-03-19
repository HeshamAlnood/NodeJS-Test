// Creating Web Server

const express = require("express");
const app = express();
const fs = require("fs");

const path = require("path");
const request = require("request");

const hbs = require("hbs");
const { vlink } = require("../../app");

let vhtml = fs.readFileSync("D:\\lucky.html");

let partialsPath = path.join(__dirname, "../templates/partials");

let pat1 = __dirname;
let pat2 = __filename;
let path3 = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(path3));
hbs.registerPartials(partialsPath);

String.prototype.initCap = function () {
  return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
  });
};
//runRqst

function runRqst(country, output) {
  let rsp = "";
  let vlink = runUrl(country);
  console.log(`country is ${vlink}`);
  request({ url: vlink, json: true }, (er, rs) => {
    if (er) {
      console.log(er);
      rsp = er;
      output(rsp);
      //return output;
      return;
    }

    rsp = JSON.stringify(rs.body.All);
    output(rsp);
    /*console.log(rsp);*/
    /*console.log(output(rsp));
    console.log(`check outputt ${rs.body.All}`);*/
    return JSON.stringify(rs.body.All);
    //    console.log(`rsp = ${output(rsp)}`);
    //output = rsp;

    //return output(rsp);
  });
  console.log(`rsp = ${rsp}`);
  // return output(rsp);
}

function runUrl(country) {
  let vlink = `https://covid-api.mmediagroup.fr/v1/cases?country=${country.initCap()}`;
  return vlink;
}

app.get("", (req, rsp) => {
  rsp.render("index", { Name: "HESHAM" });
});

/*app.get("", (req, rsp) => {
  rsp.send(`Helllo to my First WebServer ! 
  The Dirctorey is ${pat1} & FileName ${pat2}`);
});*/
const ob = {
  name: "hesham",
  sex: "Male",
  sal: 1200,
  family: "alNood",
  BirthYear: 1989,
};

let jobs = [
  "Oracle_Developer",
  "Mean_Develoepr",
  "Mern_Developer",
  "Java_Developer",
];

let jobsList = `<label>Choose Your Job Title</label><br />
<input list="jobs" name="jobs" id="jobsList"/>`;

let optn;
jobs.forEach((e) => {
  optn = optn + ` <option value=${e}>`;
});

jobsList = jobsList + `<datalist id="jobs">` + optn + `</datalist>`;

app.get("/info", (req, rsp) => {
  rsp.render("info", {
    Name: ob.name.toLocaleUpperCase(),
    sex: ob.sex,
    sal: ob.sal,
    BirthYear: 1989,
    Title: `Welcom to ${this.Name} info's Page !`,
    list: jobsList,
  });
});

app.get("/excel", (req, rsp) => {
  rsp.send(vhtml.toString());
});

app.get("/download", (req, rsp) => {
  //rsp.send(vhtml.toString());
  let vlink = "D:\\00050.png";
  rsp.download(vlink);
});

app.get("/info/*", (rqs, rsp) => {
  //rsp.send(`The path you Requested is not available !`);
  rsp.render("error", {
    error: `The Requested Info is not Exists ! Try Another Page Or Return Back ..`,
    Name: ob.name.toLocaleUpperCase(),
  });
});

app.get("/data", (rqs, rsp) => {
  //rsp.send(`The path you Requested is not available !`);
  rsp.render("data", {
    error: `The Requested Info is not Exists ! Try Another Page Or Return Back ..`,
    Name: ob.name.toLocaleUpperCase(),
  });
});

app.get("/babygirl", (rqs, rsp) => {
  //rsp.send(`The path you Requested is not available !`);
  rsp.render("babygirl", {
    Name: `Eleen`,
  });
});

app.get("/covid", (rqs, rsp) => {
  if (!rqs.query.country) {
    return rsp.send(
      `You didnt Choose country to Search ! Please choose country and procced to view`
    );
  }

  let vcountry = rqs.query.country;
  console.log(vcountry);
  let res;
  runRqst(vcountry, (e) => {
    console.log(`e is ${e}`);
    res = e;
    console.log(`res is ${res}`);
    rsp.send(`Getting data ${res}`);
  });
  //let { ob } = vrs;
  console.log(`vrs printing Down : ${res}`);
  console.log(res);

  /*console.log(`ob printing Down : `);
  console.log(ob);*/

  //rsp.send(vrs.toString());
});

app.get("*", (rqs, rsp) => {
  //rsp.send(`The path you Requested is not available !`);
  rsp.render("error", {
    error: `The Requested Page is not Found ! Try Another Page Or Return Back ..`,
    Name: ob.name.toLocaleUpperCase(),
  });
});

//runRqst("Yemen");

// creating WebServer
app.listen(3000, () => console.log(`Hesh Server is Up Running  `));
