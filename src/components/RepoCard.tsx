import React, { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../models/models';

type Props = {
  repo: IRepo;
};

const RepoCard = ({ repo }: Props) => {
  const { addFavorite, removeFavorite } = useActions();
  const { favorite } = useAppSelector((state) => state.github);

  const [isFavorite, setIsFavorite] = useState(
    favorite.includes(repo.html_url)
  );

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavorite(repo.html_url);
    setIsFavorite(true);
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavorite(repo.html_url);
    setIsFavorite(false);
  };

  return (
    <a href={repo.html_url} target='_blank'>
      <div className=' border py-3 px-5 rounded-sm mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
        <h2 className=' text-lg font-bold'>{repo.full_name}</h2>
        <p className=' text-sm'>
          Forks: <span className=' font-bold mr-2'>{repo.forks}</span>
          Watchers: <span className=' font-bold'>{repo.watchers}</span>
        </p>
        <p className=' text-sm font-this'>{repo?.description}</p>
        {!isFavorite && (
          <button
            className=' py-2 mr-2 mt-3 px-4 bg-yellow-400 rounded-sm hover:shadow-md transition-all'
            onClick={(e) => addToFavorite(e)}
          >
            Add
          </button>
        )}
        {isFavorite && (
          <button
            className=' py-2 mt-3 px-4 bg-red-400 rounded-sm hover:shadow-md transition-all'
            onClick={(e) => removeFromFavorite(e)}
          >
            Remove
          </button>
        )}
      </div>
    </a>
  );
};

export default RepoCard;
