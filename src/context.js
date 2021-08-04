import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  SET_COMMENTS,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./action";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  page: 0,
  nbPage: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const { data } = await axios.get(url);
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPage },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeStory = async (id) => {
    console.log(id);
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, removeStory }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
