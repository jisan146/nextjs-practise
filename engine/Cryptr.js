const Cryptr = require('cryptr');
const cryptr = new Cryptr('YLd2&HHa1bdykH)JXHx*7kvU');

 

//const decryptedString = cryptr.decrypt(encryptedString);
 
const encrypt = (text) => {
 
    const encryptedString = cryptr.encrypt(text);
    return encryptedString;
 }

module.exports = {
    encrypt,
};

