//const oracledb = require("oracledb");
const fs = require("fs");

const mypw = "ATC2002";
let libPath = "D:\\instantclient_21_3";

const oracledb = require("oracledb");
try {
  oracledb.initOracleClient({ libDir: libPath });
} catch (err) {
  console.error("Whoops!");
  console.error(err);
  process.exit(1);
}

/*if (libPath && fs.existsSync(libPath)) {
  oracledb.initOracleClient({ libDir: libPath });
}
*/
let user = "ATC2002";
let sql = `SELECT * 
      from sales_invoice_Hd
      where sih_inv_No in (:id,:id2)`;
let binds = [`099768`, `099767`];

user = "fin";
sql = `select bill_id , payee_name,paid_amnt , bill_desc 
from rev_Sadad_bill
where bill_id in (:id,:id2)`;
binds.length = 0;
binds = ["980000219121", "990000162832"];
let qResult;

user = user.toLocaleUpperCase();
oracledb.getConnection(
  {
    user: user,
    password: user,
    connectString: "192.168.0.151:1521/orcl",
  },
  function (err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      sql,
      binds, // bind value for :id
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
      function (err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(`result.rows`);
        console.log(result.rows);
        //WrtieExcel(result.rows);
        qResult = result.rows;

        //console.dir(result.rows, { depth: null });
        //console.dir(result.metaData, { depth: null });

        doRelease(connection);
      }
    );
  }
);

function doRelease(connection) {
  connection.close(function (err) {
    if (err) console.error(err.message);
  });
}

function WrtieExcel(obj) {
  var XLSX = require("xlsx");
  var workbook = XLSX.utils.book_new();
  var worksheet = XLSX.utils.json_to_sheet(obj);
  XLSX.utils.book_append_sheet(workbook, worksheet, "data");

  //XLSX.utils.json_to_sheet(vValues);
  let filename = `D:\\project\\NodeJs\\Weather-app\\web_server\\public\\testDb.xlsx`;
  XLSX.writeFile(workbook, filename, "");
}

module.exports = { qResult: qResult };
