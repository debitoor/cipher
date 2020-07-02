declare function Cipher(secret: string): Cipher.context;
export = Cipher;

declare namespace Cipher {
	export type Encrypt = {
		iv: string;
		data: string;
	};

	export interface context {
		encrypt: (secret: string) => Encrypt;
		decrypt: (data: Encrypt) => any;
	}
}