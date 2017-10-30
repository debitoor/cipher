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

		it('should return object with encode and decode methods', () => {
			expect(result).to.containSubset({
				encode: (value) => typeof value === 'function',
				decode: (value) => typeof value === 'function',
			});
		});
	});

	describe('encode', () => {
		const originalData = {a: 1, b: 2};
		const secret = 'test secret';
		let encoded;

		before(() => encoded = cipher(secret).encode(originalData));

		it('should return object', () => {
			expect(encoded).to.be.an('object');
		});

		it('should have iv property', () => {
			expect(encoded).to.have.property('iv');
		});

		it('should have data property', () => {
			expect(encoded).to.have.property('data');
		});

		describe('decode', () => {
			let decoded;

			before(() => decoded = cipher(secret).decode({iv: encoded.iv, data: encoded.data}));

			it('should return decoded data', () => {
				expect(decoded).to.eql(originalData);
			});
		});

		describe('decode with wrong secret', () => {
			let decoded;
			before(() => decoded = cipher('another secret').decode({iv: encoded.iv, data: encoded.data}));

			it('should return null', () => {
				expect(decoded).to.eql(null);
			});
		});

		describe('decode with wrong iv', () => {
			const iv = crypto.randomBytes(16).toString('hex');
			let decoded;
			before(() => decoded = cipher(secret).decode({iv, data: encoded.data}));

			it('should return null', () => {
				expect(decoded).to.eql(null);
			});
		});
	});
});
