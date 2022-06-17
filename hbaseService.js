const {client} = require('services/hbase-client/hbaseConnecter')
const {resolve} = require("path");


function initTable(){
    client
        .table("tb_kline")
        .create("cf_origin", (err, success) => {
            success ? console.log("initTable : " + success) : console.log(err)
        })
}

function deleteTable(){
    client
        .table("tb_kline")
        .delete((err,success)=>{
            success ? console.log("deleteTable : " + success) : console.log(err)
        })
}
//
async function insertKline(data) {
    return new Promise((resolve,reject) => {
        client
            .table('tb_kline')
            .row("BTCUSDT_" + new Date())
            .put("cf_origin:test", data, (err, success) => {
                success ? resolve(success) : reject(err)
            })
    })
}


function selectKline(data) {
    const scanner = client
        .table("tb_kline")
        .scan({
            startRow: "BTCUSDT"
        })
    const rows = []

    scanner.on('readable', function(){
        while(chunk = scanner.read()){
            console.log('read');
            rows.push(chunk);
            console.log(rows)
        }
    });
    scanner.on('error', function(err){
        console.log(err);
    });
    scanner.on('end', function(){
        console.log('end');
        console.log(rows);
    });

}

module.exports = {initTable,insertKline,selectKline}