import axios from 'axios';
import md5 from 'md5.js';

let latestNonce = '';

export function sendDigestAuthRequest() {
  const apiUrl = 'http://183.207.118.214:10000/uas/v1/api/dev/list';
  const username = 'zhxyadmindj';
  const password = 'EdT!h6f#';
  const requestData = {
    type: '0',
    clientId: '',
    countOnOffLine: 0,
  };

  function generateCNonce(length = 8) {
    let result = '';
    const characters = 'abcdef0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const cnonce = generateCNonce();

  function constructAuthHeader() {
    const nonce = latestNonce || 'v30HbSzvMqNPZEqvEY3MfDNKpT3XmWMB6h';

    const ha1 = new md5().update(`${username}:${'allcam'}:${password}`).digest('hex');
    console.log("HA1:", ha1);

    const ha2 = new md5().update(`POST:${apiUrl}`).digest('hex');
    console.log("HA2:", ha2);

    const response = new md5().update(`${ha1}:${nonce}:${cnonce}:auth:${ha2}`).digest('hex');
    console.log("Response:", response);

    return `Digest username="${username}", realm="allcam", nonce="${nonce}", uri="/uas/v1/api/dev/list", algorithm="MD5", qop="auth", cnonce="${cnonce}", response="${response}", opaque="rMKvlu7Xkf8hYxatb4zx8HnWSbbgKumgeu"`;
  }
 
  axios.post(apiUrl, requestData, {
    withCredentials: true,
    headers: {
      'Authorization': constructAuthHeader(),
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('成功：', response.data);
  })
  .catch(error => {

    if (error.response && error.response.status === 401) {
      const wwwAuthenticate = error.response.headers['www-authenticate'];
      if (wwwAuthenticate) {
        const match = wwwAuthenticate.match(/nonce=([^,]+)/);
        if (match && match[1]) {
          latestNonce = match[1];
          console.log("新的Nonce:", latestNonce);

          sendDigestAuthRequest();
        } else {
          console.error('无法解析Www-Authenticate头部');
        }
      }
    } else {
      console.error('请求失败：', error);
    }
  });
}

// 调用上面的函数
sendDigestAuthRequest();