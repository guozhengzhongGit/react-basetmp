import AES from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';
import Hex from 'crypto-js/enc-hex';
import Base64 from 'crypto-js/enc-base64';
import CFB from 'crypto-js/mode-cfb';
import pkcs7 from 'crypto-js/pad-pkcs7';

// 加密
export const encrypt = (str) => {
  const secretKey = sessionStorage.getItem('secretKey');
  if (!str || !secretKey) return '';
  const { key, iv } = JSON.parse(secretKey);
  const tmp = UTF8.parse(str);
  const secretStr = AES.encrypt(tmp, key, {
    iv,
    mode: CFB,
    padding: pkcs7,
  });
  return secretStr.ciphertext.toString().toUpperCase();
};

// 解密
export const decrypt = (word) => {
  const secretKey = sessionStorage.getItem('secretKey');
  if (!secretKey || !word) {
    console.error('解密失败，没有数据');
    return '';
  }
  const { key, iv } = JSON.parse(secretKey);
  let encryptedHexStr = Hex.parse(word);
  let src = Base64.stringify(encryptedHexStr);
  let decrypt = AES.decrypt(src, key, { iv, mode: CFB, padding: pkcs7 });
  let decryptedStr = decrypt.toString(UTF8);
  return decryptedStr.toString();
};
