import React, { useState, useEffect } from 'react';
import api from '../../util/axios';
import styled from 'styled-components';
import Albums from '../Albums';

const FeaturedAlbumWrap = styled.div``;

function FeaturedAlbums({ token }) {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeaturedlbums = async () => {
      try {
        const params = {
          params: {
            limit: 5,
          }
        };
        const { data } = await api.get('/v1/browse/featured-playlists', params);
        setFeatured(data.playlists.items);
      } catch (e) {
        console.log('e: ', e);
      }
    };
    if (token) { // TODO: 인증토큰 전역 상태관리로 변경
      fetchFeaturedlbums();
    }
  })

  return (
    <FeaturedAlbumWrap>
      <h1 className="title">Featured Albums</h1>
      <Albums albums={featured} />
      <button className="btn-more">더보기</button>
    </FeaturedAlbumWrap>
  );
}

export default FeaturedAlbums;
