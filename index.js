const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const BLOCK_SIZE = 16;

function getKey(secret) {
	return crypto.createHash('sha256').update(secret).digest();
}

function generateIv() {
	return crypto.randomBytes(BLOCK_SIZE);
}

function encode(key, json) {
	const str = JSON.stringify(json);
	const iv = generateIv();
	const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
	const encryptedStr = cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
	return {
		iv: iv.toString('hex'),
		data: encryptedStr
	};
}

function decode(key, {iv, data}) {
	try {
		const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'hex'));
		const decryptedStr = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
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
