import {
	createHmac,
	createCipheriv,
	createDecipheriv,
	randomBytes,
	scryptSync,
	timingSafeEqual
} from 'crypto';
import { PRIVATE_ENCRYPTION_KEY } from '$env/static/private';

export const hash = (plaintext: string) => {
	const salt = randomBytes(16).toString('hex');
	const hashedPassword = scryptSync(plaintext, salt, 64).toString('hex');

	return `${salt}:${hashedPassword}`;
};

export const compareHash = (plaintext: string, ciphertext: string) => {
	const [salt, key] = ciphertext.split(':');
	const hashedBuffer = scryptSync(plaintext, salt, 64);

	const keyBuffer = Buffer.from(key, 'hex');
	const match = timingSafeEqual(hashedBuffer, keyBuffer);

	return match;
};

export const generateChecksum = (plaintext: string) => {
	const hmac = createHmac('sha256', PRIVATE_ENCRYPTION_KEY).update(plaintext).digest('hex');
	return hmac;
};

export const encrypt = (plaintext: string) => {
	const iv = randomBytes(16);
	const cipher = createCipheriv('aes256', PRIVATE_ENCRYPTION_KEY, iv);

	const encryptedMessage = cipher.update(plaintext, 'utf8', 'hex') + cipher.final('hex');
	return `${iv.toString('hex')}${encryptedMessage}`;
};

export const decrypt = (ciphertext: string) => {
	const iv = Buffer.from(ciphertext.slice(0, 32), 'hex');
	const decipher = createDecipheriv('aes256', PRIVATE_ENCRYPTION_KEY, iv);

	return decipher.update(ciphertext.substring(32), 'hex', 'utf-8') + decipher.final('utf8');
};
