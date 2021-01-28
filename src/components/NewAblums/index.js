import React, { useState, useEffect, useCallback } from 'react';
import api from '../../util/axios';
import styled from 'styled-components';
import Albums from '../Albums';

const NewAlbumWrap = styled.div``;
const LIMIT = 5;
function NewAblums({ token }) {
  const [newAlbums, setNewAblums] = useState([]);
  const getNewAlbums = useCallback((nextIndex) => {
    console.log('nextIndex: ', nextIndex);
    const config = {
      params: {
        limit: LIMIT,
        offset: nextIndex,
      }
    };
    console.log('config: ', JSON.stringify(config, null, 2));
    return new Promise((resolve, reject) => {
      api.get('/v1/browse/new-releases', config)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }, []);

  const fetchNewAlbumsMore = useCallback(async () => {
    console.log('더보기');
    try {
      const { data } = await getNewAlbums(nextIndex);
      console.log('data: ', data);
      setNewAblums(newAlbums.concat(data.albums.items));
      setNextIndex((idx) => idx + data.albums.limit);
    } catch (e) {
      console.log('e: ', e);
    }
  }, [nextIndex]);

  useEffect(() => {
    const fetchNewAlbums = async () => {
      try {
        if (token) { // TODO: 인증토큰 전역 상태관리로 변경
          const { data } = await getNewAlbums();
          console.log('data: ', data);
          setNewAblums(newAlbums.concat(data.albums.items));
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
