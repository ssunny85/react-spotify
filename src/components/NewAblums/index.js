import React, { useState, useEffect } from 'react';
import api from '../../util/axios';
import styled from 'styled-components';
import Albums from '../Albums';

const NewAlumbWrap = styled.div``;

function NewAblums({ token }) {
  const [newAlbums, setNewAblums] = useState([]);

  useEffect(() => {
    const fetchNewAlbums = async () => {
      try {
        const { data } = await api.get('/v1/browse/new-releases');
        console.log('new data: ', data);
        setNewAblums(data.albums.items);
      } catch (e) {
        console.log('e: ', e);
      }
    };
    if (token) { // TODO: 인증토큰 전역 상태관리로 변경
      fetchNewAlbums();
    }
  }, [token]);

  return (
    <NewAlumbWrap>
      <h1 className="title">NEW</h1>
      <Albums albums={newAlbums} />
    </NewAlumbWrap>
  );
}

export default NewAblums;
