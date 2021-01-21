import React, { useState } from 'react';
import axios from 'axios';
import Albums from '../Albums';
import './style.scss';

function Search() {
  const [ searchWord, setSearchWord ] = useState('');
  const [ results, setResults ] = useState([]);

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

  return (
    <>
      <div className="search-form">
        <input
          type="text"
          name="searchWord"
          value={searchWord}
          onChange={changeSearchWord} />
        <button onClick={fetchSearchResults}>검색</button>
      </div>
      <strong>검색결과({results.length})</strong>
      <Albums albums={results} />
    </>
  );
}

export default Search;