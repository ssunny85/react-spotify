import React, { useState } from 'react';
import api from '../../util/axios';
import styled from 'styled-components';
import Albums from '../Albums';

const SearchWrap = styled.div`
  display: flex;
  overflow: hidden;
  height: 3.5rem;
  background: #fff;
  border: 1px solid #6741d9;
  border-radius: 6px;
  
  select {
    min-width: 7rem;
    padding: 0 .5rem;
    border: 0 none;
    background: 0 none;
    color: #6741d9;
    font-size: 14px;
  }
  
  input {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
    font-size: 14px;
  }
  
  button {
    min-width: 6rem;
    background: #6741d9;
    border: 0 none;
    padding: 0;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

function SearchForm({ options }) {
  const [searchWord, setSearchWord] = useState('');
  const [results, setResults] = useState([]);

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
      <SearchWrap>
        <select>
          {options.map((option) => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
        <input
          type="text"
          name="searchWord"
          value={searchWord}
          onChange={changeSearchWord} />
        <button onClick={fetchSearchResults}>검색</button>
      </SearchWrap>
      <Albums albums={results} />
    </>
  );
}

SearchForm.defaultProps = {
  options: [
    { id: 'album', label: '앨범' },
    { id: 'artist', label: '아티스트' },
  ],
};

export default SearchForm;