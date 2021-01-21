import React, { useState } from 'react';
import api from '../../util/axios';
import Albums from '../Albums';
import './style.scss';

function Search() {
  const [ searchWord, setSearchWord ] = useState('');
  const [ results, setResults ] = useState([]);

  const changeSearchWord = (event) => {
    setSearchWord(event.target.value);
  };

  const fetchSearchResults = async () => {
    try {
      const params = {
        params: {
          q: `name:${searchWord}`,
          type: 'album'
        }
      };
      const { data } = await api.get('/v1/search', params);
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