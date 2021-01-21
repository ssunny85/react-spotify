import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import Search from './components/Search';
import './App.scss';

function App() {
  const [ token, setToken ] = useState('');
  const [ newAlbums, setNewAlbums ] = useState([]);
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



  const fetchNewAlbums = async () => {
    try {
      // TODO: api header에 authorization 공통설정 추가, api url 환경변수 설정
      const { data } = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
        headers: {
          Authorization: token
        }
      });
      setNewAlbums(data.albums.items);
    } catch (e) {
      console.log('e: ', e);
    }
  };

  return (
    <div className="my-app">
      <button
        onClick={fetchToken}
        disabled={token}>
        토큰발급
      </button>
      <p>{token && <strong>토큰발급 완료</strong>}</p>
      <Search />
      <div>
        <button onClick={fetchNewAlbums}>신작 조회</button>
      </div>
      <Albums />
    </div>
  );
}

export default App;
