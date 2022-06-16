const env = require('config/env');
const hbase = require('hbase')

const client = hbase({
    host: env.HBASE_HOST,
    port: env.HBASE_PORT
})

module.exports = {client}