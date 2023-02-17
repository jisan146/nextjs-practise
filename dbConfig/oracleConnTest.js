var oracle = require('./oracle');
const oracledb = require('oracledb');

const os = require("os"); // Comes with node.js
var osName = os.type()



try {

  if (osName.toLowerCase().indexOf('dows') >= 0) {
    oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_3' });
    // oracledb.initOracleClient({ configDir: 'C:/oracle/instantclient_19_12' });
  }else
  {
    oracledb.initOracleClient({ libDir: '/opt/oracle/instantclient_19_12' });
    // oracledb.initOracleClient({ configDir: '/opt/oracle/instantclient_19_12' });
  }


} catch (err) {

  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}

module.exports = function (app) {
  async function run() {

    let connection;

    try {
      // Get a non-pooled connection

      connection = await oracledb.getConnection(oracle);
      console.log('Oracle DB Connection Succeed');

    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  run();

};