import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { githubApi } from '../store/github/github.api';
import { addFavorite, removeFavorite } from '../store/github/github.slice';

const actions = {
  addFavorite,
  removeFavorite,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
