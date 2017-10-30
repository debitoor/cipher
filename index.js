const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const BLOCK_SIZE = 16;
const ORIGINAL_ENCODING = 'utf8';
const SECURED_ENCODING = 'hex';

function getKey(secret) {
	return crypto.createHash('sha256').update(secret).digest();
}

function generateIv() {
	return crypto.randomBytes(BLOCK_SIZE);
}

function encode(key, json) {
	try {
		const str = JSON.stringify(json);
		const ivBuffer = generateIv();
		const cipher = crypto.createCipheriv(ALGORITHM, key, ivBuffer);
		const encryptedStr = cipher.update(str, ORIGINAL_ENCODING, SECURED_ENCODING) + cipher.final(SECURED_ENCODING);
		return {
			iv: ivBuffer.toString(SECURED_ENCODING),
			data: encryptedStr
		};
	} catch(e) {
		const err = new Error('Error during encoding');
		err.internalError = e;
		throw err;
	}
}

function decode(key, {iv, data}) {
	try {
		const ivBuffer = Buffer.from(iv, SECURED_ENCODING);
		const decipher = crypto.createDecipheriv(ALGORITHM, key, ivBuffer);
		const decryptedStr = decipher.update(data, SECURED_ENCODING, ORIGINAL_ENCODING) + decipher.final(ORIGINAL_ENCODING);
		return JSON.parse(decryptedStr);
	} catch (e) {
		const err = new Error('Error during decoding');
		err.internalError = e;
		throw err;
	}
}

module.exports = (secret) => {
	const key = getKey(secret);

	return {
		encode: encode.bind(null, key),
		decode: decode.bind(null, key)
	};
};
