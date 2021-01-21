import React from 'react';

function Albums({ albums }) {
  return (
    <ul className="album">
      {albums.map((album) => (
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
  );
}

Albums.defaultPops = {
  albums: [],
};

export default Albums;