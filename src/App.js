import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';

function App() {
  const [ token, setToken ] = useState('');
  const clientData = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    grant_type: 'client_credentials',
  };
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(clientData),
    url: `${process.env.REACT_APP_API_URL}/api/token`,
  };

  const fetchToken = async () => {
    try {
      const { data } = await axios(options);
      setToken(`${data['token_type']} ${data['access_token']}`);
    } catch (e) {
      console.log('e: ', e);
    }
  };

  return (
    <div className="App">
      <button
        onClick={fetchToken}
        disabled={token}>
        토큰발급
      </button>
      <p>{token && <strong>토큰발급 완료</strong>}</p>
    </div>
  );
}

export default App;
