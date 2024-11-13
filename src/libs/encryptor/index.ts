import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { IEncryptor } from './encryptor.interface';

@Injectable()
export class Encryptor implements IEncryptor {
    private readonly _algorithm = 'aes-256-cbc';
    private readonly _key = process.env.ENCRYPTOR_SECRET_KEY || '';

    private readonly _iv = crypto.randomBytes(16);

    private toBuffer32(str: string): Buffer {
        // Create a buffer from the string
        const buf = Buffer.from(str, 'utf-8');
        // Ensure the buffer is 32 bytes long
        if (buf.length > 32) {
            return buf.slice(0, 32);
        } else if (buf.length < 32) {
            const paddedBuf = Buffer.alloc(32);
            buf.copy(paddedBuf);
            return paddedBuf;
        }
        return buf;
    }

    encrypt(text: string, key?: string): string {
        const _key = key ?? this.toBuffer32(this._key);
        const cipher = crypto.createCipheriv(this._algorithm, _key, this._iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return `${this._iv.toString('hex')}:${encrypted.toString('hex')}`;
    }

    decrypt(encryptedText: string, key?: string): string {
        try {
            const _key = key ?? this.toBuffer32(this._key);
            const textParts = encryptedText.split(':');
            const iv = Buffer.from(textParts.shift() || '', 'hex');
            const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex');
            const decipher = crypto.createDecipheriv(this._algorithm, _key, iv);
            const decrypted = Buffer.concat([
                decipher.update(encryptedTextBuffer),
                decipher.final(),
            ]);
            return decrypted.toString();
        } catch (error) {
            return '';
        }
    }
}
