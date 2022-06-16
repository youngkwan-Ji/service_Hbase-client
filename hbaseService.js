const {client} = require('services/hbase-client/hbaseConnecter')


function initTable(){
    client
        .table("tb_kline")
        .create("cf_origin", (err, success) => {
            if (success){
                client
                    .table("tb_kline")
                    .row("BTCUSDT")
                    .put("cf_origin:test","1234", (err, success)=>{
                        if (success){
                            client
                                .table('tb_kline' )
                                .row('BTCUSDT')
                                .get('cf_origin', function(err, [cell]){
                                    // Validate the result
                                    console.log(cell)
                                })
                        }else{
                            console.log(err)
                        }
                    })
            }else{
                console.log(err)
            }
        })
}

function createTable(data){
    client
        .table(data["table"])
}
//
async function insertKlineData(data) {
    client
        .table('tb_kline')
        .row("BTCUSDT")
        .put("cf_origin:test", data, async (err,success)=>{
            await new Promise((resolve, reject) => {})
            return
        })
}

module.exports = {initTable,insertKlineData}