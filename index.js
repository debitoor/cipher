const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const BLOCK_SIZE = 16;
const ORIGINAL_ENCODING = 'utf8';
const ENCODED_ENCODING = 'hex';

function getKey(secret) {
	return crypto.createHash('sha256').update(secret).digest();
}

function generateIv() {
	return crypto.randomBytes(BLOCK_SIZE);
}

function encode(key, json) {
	const str = JSON.stringify(json);
	const ivBuffer = generateIv();
	const cipher = crypto.createCipheriv(ALGORITHM, key, ivBuffer);
	const encryptedStr = cipher.update(str, ORIGINAL_ENCODING, ENCODED_ENCODING) + cipher.final(ENCODED_ENCODING);
	return {
		iv: ivBuffer.toString(ENCODED_ENCODING),
		data: encryptedStr
	};
}

function decode(key, {iv, data}) {
	try {
		const ivBuffer = Buffer.from(iv, ENCODED_ENCODING);
		const decipher = crypto.createDecipheriv(ALGORITHM, key, ivBuffer);
		const decryptedStr = decipher.update(data, ENCODED_ENCODING, ORIGINAL_ENCODING) + decipher.final(ORIGINAL_ENCODING);
		return JSON.parse(decryptedStr);
	} catch (e) {
		return null;
	}
}

module.exports = (secret) => {
	const key = getKey(secret);

	return {
		encode: encode.bind(null, key),
		decode: decode.bind(null, key)
	};
};
