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
  const [search, setSearch] = useState({
    type: 'album',
    word: '',
  });
  const [isSearched, setIsSearched] = useState(false);
  const [results, setResults] = useState([]);

  const changeSearchWord = (event) => {
    const { name, value } = event.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const changeSearchOption = (event) => {
    const { name, value } = event.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const fetchSearchResults = async () => {
    try {
      const params = {
        params: {
          q: search.word,
          type: search.type,
        }
      };
      console.log('params: ', params);
      const { data } = await api.get('/v1/search', params);
      console.log('검색 data: ', data);
      setResults(data.albums.items);
      setIsSearched(true);
      setSearch({ // TODO: 초기값 설정
        type: 'album',
        word: '',
      });
    } catch (e) {
      console.log('e: ', e);
    }
  };

  return (
    <>
      <SearchWrap>
        <select name="type" onChange={changeSearchOption}>
          {options.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
        <input
          type="text"
          name="word"
          value={search.word}
          onChange={changeSearchWord} />
        <button onClick={fetchSearchResults}>검색</button>
      </SearchWrap>
      {isSearched &&
        <>
          <h1 className="title">검색결과</h1>
          {results.length > 0 ?
            <Albums albums={results}/>
            : <p>no data</p>
          }
        </>
      }
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