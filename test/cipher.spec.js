const chai = require('chai');
chai.use(require('chai-subset'));
const expect = chai.expect;

const crypto = require('crypto');
const cipher = require('../index');

describe('cipher', () => {
	it('should export function', () => {
		expect(cipher).to.be.a('function');
	});

	describe('initialize', () => {
		let result;
		before('init', () => result = cipher('test'));

		it('should return object with encrypt and decrypt methods', () => {
			expect(result).to.containSubset({
				encrypt: (value) => typeof value === 'function',
				decrypt: (value) => typeof value === 'function',
			});
		});
	});

	describe('encrypt', () => {
		const originalData = {a: 1, b: 2};
		const secret = 'test secret';
		let encrypted;

		before(() => encrypted = cipher(secret).encrypt(originalData));

		it('should return object', () => {
			expect(encrypted).to.be.an('object');
		});

		it('should have iv property', () => {
			expect(encrypted).to.have.property('iv');
		});

		it('should have data property', () => {
			expect(encrypted).to.have.property('data');
		});

		describe('decrypt', () => {
			let decrypted;

			before(() => decrypted = cipher(secret).decrypt({iv: encrypted.iv, data: encrypted.data}));

			it('should return decrypted data', () => {
				expect(decrypted).to.eql(originalData);
			});
		});

		describe('decrypt with wrong secret', () => {
			let decode;
			before(() => decode = cipher('another secret').decrypt.bind(null, {iv: encrypted.iv, data: encrypted.data}));

			it('should throw error', () => {
				expect(decode).to.throw('Error during decrypting').with.property('internalError');
			});
		});

		describe('decrypt with wrong iv', () => {
			const iv = crypto.randomBytes(16).toString('hex');
			let decrypt;
			before(() => decrypt = cipher(secret).decrypt.bind(null, {iv, data: encrypted.data}));

			it('should throw error', () => {
				expect(decrypt).to.throw('Error during decrypting').with.property('internalError');
			});
		});
	});

	describe('encrypt with invalid data', () => {
		const originalData = {};
		originalData.circular = originalData;

		const secret = 'test secret';
		let encrypt;

		before(() => encrypt = cipher(secret).encrypt.bind(null, originalData));

		it('should throw error', () => {
			expect(encrypt).to.throw('Error during encrypting').with.property('internalError');
		});

	});
});
