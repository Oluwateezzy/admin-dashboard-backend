export interface IHasher {
  hash(text: string): Promise<string>;
  compare(plain: string, cipher: string): Promise<boolean>;
}
