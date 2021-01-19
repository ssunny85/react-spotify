import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';

function App() {
  const [ token, setToken ] = useState({
    type: '',
    accessToken: ''
  });
  const clientData = {
    client_id: '', // TODO: 환경변수로 받아올 예정
    client_secret: '', // TODO: 환경변수로 받아올 예정
    grant_type: 'client_credentials',
  };
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(clientData),
    url: 'https://accounts.spotify.com/api/token',
  };

  const fetchToken = async () => {
    try {
      const { data } = await axios(options);
      setToken({
        ...token,
        type: data['token_type'],
        accessToken: data['access_token'],
      });
    } catch (e) {
      console.log('e: ', e);
    }
  };

  return (
    <div className="App">
      <button
        onClick={fetchToken}
        disabled={token.accessToken}>
        토큰발급
      </button>
      <p>{token.accessToken && <strong>토큰발급 완료</strong>}</p>
    </div>
  );
}

export default App;
