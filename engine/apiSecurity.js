const fs = require('fs');
var md5 = require('md5');
var sha512 = require('js-sha512');

function orgID(uid) {
  var orgID = null;
  const path = require('path');
  let rootLoc = path.join(__dirname, '../');

  try {
    var userBasicInfo = fs.readFileSync(rootLoc + '/userFiles/token/6049668462a66a8d78fc7e1ce56b8bb8/' + uid, 'utf8');
    userBasicInfo = JSON.parse(userBasicInfo)
    orgID = userBasicInfo.orgID;
  }
  catch {
    orgID = null;
  }

  return orgID;

}
function branch(uid) {
  var branch = null;
  const path = require('path');
  let rootLoc = path.join(__dirname, '../');

  try {
    var userBasicInfo = fs.readFileSync(rootLoc + '/userFiles/token/6049668462a66a8d78fc7e1ce56b8bb8/' + uid, 'utf8');
    userBasicInfo = JSON.parse(userBasicInfo)
    branch = userBasicInfo.branch;

  }
  catch (ex) {
    branch = null;

  }

  return branch;

} 
function authentication(uid) {
  var auth = 0;
  const path = require('path');
  let rootLoc = path.join(__dirname, '../');

  try {
    auth = fs.readFileSync(rootLoc + '/userFiles/token/'  + md5(sha512(String(uid))), 'utf8');
  }
  catch (ex) {
    auth = 'denied';
  }

  return auth;

}
module.exports = {
  authentication, orgID, branch,
};