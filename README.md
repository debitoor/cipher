# cipher

[![Build status](https://teamcity.debitoor.com/app/rest/builds/buildType(id:DebitoorUbuntu_Modules_Cipher)/statusIcon)](https://teamcity.debitoor.com/viewType.html?buildTypeId=DebitoorUbuntu_Modules_Cipher)
[![Coverage Status](https://coveralls.io/repos/github/debitoor/cipher/badge.svg?branch=master&t=ZK1Tre)](https://coveralls.io/github/debitoor/cipher?branch=master)

Encrypt/decrypt objects using aes-256-cbc algorithm

### Install
```sh
npm i -SE @debitoor/cipher
```

### Usage
```javascript
const cipher = require('@debitoor/cipher')('secret');

try {
    const encrypted = cipher.encrypt({userId: '123456'});
    console.log(encrypted); // { iv: 'eb0911c423161f0488337e5007887581', data: 'fd9612df14729ec373214f151b62fab74f8d7c5756082e4d057632dc5ea8d088' }
    
    const decrypted = cipher.decrypt(encrypted);
    console.log(decrypted); // { userId: '123456' }

} catch (e) {
	// Handle error during encrypting/decrypting
}


```

### API
* **cipher(secret)** - return cipher instance with given secret key
* **cipherInstanse.encrypt(json)** - encrypt object with secret and random initialization vector. Returns `{iv, data}` where iv - initialization vector, data - encrypted object. Throws error if json is invalid.
* **cipherInstanse.decrypt({iv, data})** - decrypt previously encrypted object. Takes `{iv, data}` as argument where iv - initialization vector, data - encrypted object. Throws error if wrong secret key or incorrect data provided.
