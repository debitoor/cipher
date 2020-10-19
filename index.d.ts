declare function Cipher(secret: string): Cipher.context;
export = Cipher;

declare namespace Cipher {
	export type Encrypt = {
		iv: string;
		data: string;
	};

	export interface context {
		encrypt: (secret: any) => Encrypt;
		decrypt: <T = any>(data: Encrypt) => T;
	}
}