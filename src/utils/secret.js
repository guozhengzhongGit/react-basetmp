import JsEncrypt from 'jsencrypt/bin/jsencrypt';
const sign = new JsEncrypt();
const publicKey = sessionStorage.getItem('publicKey');

export const secretValue = (value) => {
  if (!value || !publicKey) return '';
  sign.setPublicKey(JSON.parse(publicKey).pub);
  console.log('加密前后的数据', value, sign.encrypt(value));
  return sign.encrypt(value.trim());
};
