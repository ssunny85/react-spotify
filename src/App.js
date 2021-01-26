import React, { useState, useEffect } from 'react';
import qs from 'qs';
import api from './util/axios';
import './App.scss';
import SearchForm from './components/SearchForm';
import NewAblums from './components/NewAblums';

function App() {
  const [token, setToken] = useState('');
  const clientData = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    grant_type: 'client_credentials',
  };
  const tokenOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(clientData),
    url: `${process.env.REACT_APP_TOKEN_API_URL}/api/token`,
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await api(tokenOptions);
        const token = `${data['token_type']} ${data['access_token']}`;
        api.defaults.headers.common['Authorization'] = token;
        setToken(token);
      } catch (e) {
        console.log('e: ', e);
      }
    };
    fetchToken();
  }, []);

  return (
    <div className="my-app">
      <SearchForm />
      {/*TODO: 인증토큰 전역 상태관리로 변경*/}
      <NewAblums token={token} />
    </div>
  );
}

export default App;
