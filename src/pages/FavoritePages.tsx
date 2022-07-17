import React from 'react';
import { useAppSelector } from '../hooks/redux';

type Props = {};

const FavoritesPages = (props: Props) => {
  const { favorite } = useAppSelector((state) => state.github);

  if (favorite.length === 0) {
    return <p className=' text-center'>No items</p>;
  }
  return (
    <div className=' justify-center flex pt-10 mx-auto h-screen w-screen'>
      <ul className=' list-none'>
        {favorite.map((f) => (
          <li key={f}>
            <a href={f} target='_blank'>
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPages;
