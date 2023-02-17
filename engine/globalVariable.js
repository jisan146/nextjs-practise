uploadPath = __dirname + '/userFiles'
apiRewrite = '/node'


var os = require("os");
var hostname = os.hostname();

var DB;
DB = "oracle";
//DB = "mysql"; 

var runMode = '_dev_'

apiRewrite = '/node'

var dbSyntex = [], supportedDB = [];
supportedDB[0] = 'oracle';
supportedDB[1] = 'mysql';


dbSyntex['i'] =
{
    ['oracle']: 'number',
    ['mysql']: 'double'
};
dbSyntex['lt'] =
{
    ['oracle']: 'clob',
    ['mysql']: 'text'
};
dbSyntex['t'] =
{
    ['oracle']: 'VARCHAR2(4000)',
    ['mysql']: 'text'
};
dbSyntex['f'] =
{
    ['oracle']: 'VARCHAR2(4000)',
    ['mysql']: 'text'
};
dbSyntex['d'] =
{
    ['oracle']: 'timestamp',
    ['mysql']: 'timestamp'
};
dbSyntex['ai'] =
{
    ['oracle']: 'number',
    ['mysql']: 'double'
};
dbSyntex['dbl'] =
{
    ['oracle']: 'number',
    ['mysql']: 'double'
};
dbSyntex['time'] =
{
    ['oracle']: 'current_timestamp',
    ['mysql']: 'now()'
};

dbSyntex['nvl'] =
{
    ['oracle']: 'nvl',
    ['mysql']: 'ifnull'
};
dbSyntex['transaction'] =
{
    ['oracle']: 'select 1 from dual',
    ['mysql']: 'SET autocommit = 0'
};

dbParam =
{
    oracle: ":p",
    mysql: "?"
}


module.exports = {
    uploadPath, apiRewrite, DB, runMode, supportedDB, dbSyntex,
    dbi(_val) {
        if (_val == null || _val == '' || typeof _val == 'undefined') {
            _val = null
        } else if (_val == 'null') {
            _val = null
        }
        else {
            _val = _val
        }
        return _val;
    },

    dbParmGen(num) {
        if (DB == "oracle") {
            return dbParam[DB] + num;
        } else if (DB == "mysql") {
            return dbParam[DB]
        }
    },

    toDate(date_) {
        if (DB == "oracle") {
            if (date_ == null || date_ == '' || typeof date_ == 'undefined') {
                return null
            } else if (date_ == 'null') {
                return null
            }
            else {
                return "TO_DATE('" + date_ + "', 'YYYY-MM-DD')"
            }

        } else if (DB == "mysql") {
            if (date_ == null || date_ == '' || typeof date_ == 'undefined') {
                return null
            } else if (date_ == 'null') {
                return null
            }
            else {
                return "STR_TO_DATE('" + date_ + "', '%Y-%m-%d')"
            }

        }
    },

    date_to_str(col, format) {

        if (DB == "oracle") { 
            return "to_char(" + col + ",'" + format.replace(/%/g, "") + "')";
        }
        else if (DB == "mysql") {
            return "DATE_FORMAT(" + col + ",'" + format + "')";
        }
        

    },
    row_limit(val) {

        if (DB == "oracle") { 
            return "FETCH FIRST "+val+" ROWS ONLY";
        }
        else if (DB == "mysql") {
            return "limit "+val;
        }
        

    }

};

