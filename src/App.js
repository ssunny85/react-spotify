import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import './App.scss';

function App() {
  const [ token, setToken ] = useState('');
  const [ searchWord, setSearchWord ] = useState('');
  const [ results, setResults ] = useState([]);
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
    setSearchWord(event.target.value);
  };

  const fetchSearchResults = async () => {
    console.log('검색!!');
    try {
      // TODO: api header에 authorization 공통설정 추가, api url 환경변수 설정
      const config = {
        headers: {
          Authorization: token
        },
        params: {
          q: `name:${searchWord}`,
          type: 'album'
        }
      };
      const { data } = await axios.get('https://api.spotify.com/v1/search', config);
      console.log('검색 data: ', data);
      setResults(data.albums.items);
      setSearchWord('');
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

      <div className="search">
        <input
          type="text"
          name="searchWord"
          value={searchWord}
          onChange={changeSearchWord} />
        <button onClick={fetchSearchResults}>검색</button>
      </div>
      <strong>검색결과({results.length})</strong>

      // TODO: 앨범목록 공통 컴포넌트로 변경
      {results.length > 0 ?
        <ul className="album">
          {results.map((album) => (
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
        : <p>검색결과 없음</p>
      }

      <div>
        <button onClick={fetchNewAlbums}>신작 조회</button>
      </div>

      // TODO: 앨범목록 공통 컴포넌트로 변경
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
