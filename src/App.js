import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import './App.scss';

function App() {
  const [ token, setToken ] = useState('');
  const [ searchWord, setSearchWord ] = useState('');
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

  const changeSearchWord = (event) => {
    console.log('event: ', event.target.value);
    setSearchWord(event.target.value);
    console.log('search word: ', searchWord);
  };

  const fetchSearchResults = () => {
    console.log('검색!!');
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
    <div className="App">
      <button
        onClick={fetchToken}
        disabled={token}>
        토큰발급
      </button>
      <p>{token && <strong>토큰발급 완료</strong>}</p>

      <div className="search">
        <input
          type="text"
          name="searchWord"
          value={searchWord}
          onChange={changeSearchWord} />
        <button onClick={fetchSearchResults}>검색</button>
      </div>

      <div>
        <button onClick={fetchNewAlbums}>신작 조회</button>
      </div>
      {newAlbums.length > 0 ?
        <ul className="album">
          {newAlbums.map((album) => (
            <li className="album-item" key={album.id}>
              <div>
                <strong className="album-item__name">{album.name}</strong>
                <p className="album-item__info">
                  <span>발매일자: {album.release_date}</span>
                </p>
              </div>
              {album.images.filter((image) => image.height === 64).map((image, index) => (
              <span className="album-item__picture" key={`${image}_${index}`}>
                <img src={image.url} alt="" />
              </span>
              ))}
            </li>
          ))}
        </ul>
        : <p>신작 없음</p>
      }
    </div>
  );
}

export default App;
