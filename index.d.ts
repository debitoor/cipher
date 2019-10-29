declare function Cipher(secret: string): Cipher.func;
export = Cipher;

declare namespace Cipher {
	export type Encrypt = {
		iv: string;
		data: string;
	};

	export interface func {
		encrypt: (accessToken: string) => Encrypt;
		decrypt: (data: Encrypt) => any;
	}
}