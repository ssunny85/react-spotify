import React from 'react';
import styled from 'styled-components';

const AlbumsWrap = styled.div`
  margin-top: 2rem;
  
  .total {
    strong {
      color: #e8590c;
    }
  }
`;

const AlbumList = styled.ul`
  .album-item {
    padding: 1rem;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    
    button {
      padding: 0.2rem 0.5rem;
      background: #fff;
      color: #6741d9;
      border: 1px solid #6741d9;
      border-radius: 4px;
    }
  }
`;

function Albums({ albums }) {
  const playMusic = () => {
    console.log('음악 재생');
  };
  return (
    <AlbumsWrap>
      {albums.length > 0 ?
      <>
        <p className="total">총 <strong>{albums.length}</strong>개</p>
        <AlbumList>
          {albums.map((album) => (
          <li className="album-item" key={album.id}>
            <div>
              <strong className="album-item__name">{album.name}</strong>
              <p className="album-item__info">
                <span>발매일자: {album.release_date}</span>
              </p>
              <button onClick={playMusic}>재생</button>
            </div>
            {album.images.filter((image) => image.height === 64).map((image, index) => (
            <span className="album-item__picture" key={`${image}_${index}`}>
              <img src={image.url} alt="" />
            </span>
            ))}
          </li>
          ))}
        </AlbumList>
      </>
      : <p>no data</p>
      }
    </AlbumsWrap>
  );
}

Albums.defaultProps = {
  albums: [],
};

export default Albums;