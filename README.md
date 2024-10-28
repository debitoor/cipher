# cipher

> [!WARNING]
> **Deprecated!** This package has been deprecated. Please find details of the replacement package `@sumup/cipher` [here](https://github.com/sumup/invoices-node-packages/tree/main/packages/cipher)


[![Build Status](https://travis-ci.org/debitoor/cipher.svg?branch=master)](https://travis-ci.org/debitoor/cipher)
[![Coverage Status](https://coveralls.io/repos/github/debitoor/cipher/badge.svg?branch=master&t=ZK1Tre)](https://coveralls.io/github/debitoor/cipher?branch=master)
[![npm (scoped)](https://img.shields.io/npm/v/@debitoor/cipher.svg)](https://www.npmjs.com/package/@debitoor/cipher)

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
* **cipherInstance.encrypt(json)** - encrypt object with secret and random initialization vector. Returns `{iv, data}` where iv - initialization vector, data - encrypted object. Throws error if json is invalid.
* **cipherInstance.decrypt({iv, data})** - decrypt previously encrypted object. Takes `{iv, data}` as argument where iv - initialization vector¹, data - encrypted object. Throws error if wrong secret key or incorrect data provided.

¹ (https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options): Initialization vectors should be unpredictable and unique; ideally, they will be cryptographically random. **They do not have to be secret**: IVs are typically just added to ciphertext messages unencrypted. It may sound contradictory that something has to be unpredictable and unique, but does not have to be secret; it is important to remember that an attacker must not be able to predict ahead of time what a given IV will be.
