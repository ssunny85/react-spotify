import React, { useState, useEffect, useCallback } from 'react';
import api from '../../util/axios';
import styled from 'styled-components';
import Albums from '../Albums';

const NewAlbumWrap = styled.div``;
const LIMIT = 5;
let index = 0;

function NewAblums({ token }) {
  const [newAlbums, setNewAlbums] = useState([]);
  const getNewAlbums = useCallback((index) => {
    const config = {
      params: {
        limit: LIMIT,
        offset: LIMIT * index,
      }
    };
    return new Promise((resolve, reject) => {
      api.get('/v1/browse/new-releases', config)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }, [index]);

  const fetchNewAlbumsMore = useCallback(async () => {
    try {
      const { data } = await getNewAlbums(index);
      setNewAlbums(newAlbums.concat(data.albums.items));
      index ++;
    } catch (e) {
      console.log('e: ', e);
    }
  }, [newAlbums]);

  useEffect(() => {
    const fetchNewAlbums = async () => {
      try {
        if (token) { // TODO: 인증토큰 전역 상태관리로 변경
          const { data } = await getNewAlbums(index);
          setNewAlbums(newAlbums.concat(data.albums.items));
          index++;
        }
      } catch (e) {
        console.log('e: ', e);
      }
    };
    fetchNewAlbums();
  }, [token]);

  return (
    <NewAlbumWrap>
      <h1 className="title">New Albums</h1>
      <Albums albums={newAlbums} />
      <button className="btn-more" onClick={fetchNewAlbumsMore}>더보기</button>
    </NewAlbumWrap>
  );
}

export default NewAblums;
