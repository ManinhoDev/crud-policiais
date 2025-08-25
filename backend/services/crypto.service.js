const crypto = require('crypto');


const keyB64 = process.env.ENC_KEY;
if (!keyB64) throw new Error('ENC_KEY ausente no .env');
const key = Buffer.from(keyB64, 'base64');
if (key.length !== 32) throw new Error('ENC_KEY deve ter 32 bytes (base64 de 32 bytes)');


function encrypt(plainText) {
const iv = crypto.randomBytes(12);
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const encrypted = Buffer.concat([cipher.update(String(plainText), 'utf8'), cipher.final()]);
const tag = cipher.getAuthTag();
return `${iv.toString('base64')}:${encrypted.toString('base64')}:${tag.toString('base64')}`;
}


function decrypt(payload) {
const [ivB64, encB64, tagB64] = String(payload).split(':');
const iv = Buffer.from(ivB64, 'base64');
const enc = Buffer.from(encB64, 'base64');
const tag = Buffer.from(tagB64, 'base64');
const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
decipher.setAuthTag(tag);
const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
return dec.toString('utf8');
}


module.exports = { encrypt, decrypt };