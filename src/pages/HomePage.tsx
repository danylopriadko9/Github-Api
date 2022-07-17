import React, { useEffect, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/github/github.api';

type Props = {};

const HomePage: React.FC = (props: Props) => {
  const [search, setSearch] = useState<string>('');
  const debounce = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
    skip: debounce.length < 3,
    refetchOnFocus: true,
  });
  const [dropdown, setDropdown] = useState(false);

  const [fetchRepos, { isLoading: isReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (name: string) => {
    fetchRepos(name);
    setSearch('');
  };

  useEffect(() => {
    window.addEventListener('click', handleUserKeyPress);

    return () => {
      window.removeEventListener('click', handleUserKeyPress);
    };
  }, []);

  const handleUserKeyPress = () => {
    setDropdown(false);
  };

  useEffect(() => {
    debounce.trim().length > 3 ? setDropdown(true) : setDropdown(false);
  }, [debounce]);
  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && (
        <p className='text-center text-red-600'>Something went wrong...</p>
      )}
      <div className=' relative w-[560px]'>
        <input
          className=' border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='Search for Github username...'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul className=' list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll'>
            {isLoading && <p className=' text-center'>Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                className=' py-2 px-4 hover:bg-gray-300 hover:text-white transition-colors cursor-pointer flex'
                onClick={() => clickHandler(user.login)}
              >
                <img
                  className=' rounded-full w-[30px] h-[30px] mr-5'
                  src={user.avatar_url}
                  alt=''
                />
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className='container'>
          {isReposLoading && <p>Repos are loading...</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
