type Encrypt = {
	iv: string;
	data: string;
}

interface Cipher {
	encrypt: (accessToken: string) => Encrypt;
	decrypt: (data: Encrypt) => any;
}

export default function (secret: string): Cipher;