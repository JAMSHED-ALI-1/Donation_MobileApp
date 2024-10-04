import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getNewsAPI, getSourceAPI } from "./api";

export const Newscontext = createContext();

const Context = ({ children }) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [source, setSource] = useState();
  const [index, setIndex] = useState(1);
  const [darkTheme, setDarkTheme] = useState(true);

  const fetchNews = async (reset = category) => {
    try {
      const { data } = await axios.get(getNewsAPI(reset));
      setNews(data);
      setIndex(1);
    } catch (error) {
      console.log("Error fetching news:", error);
    }
  };

  const fetchNewsfromSource = async () => {
    try {
      const { data } = await axios.get(getSourceAPI(source));
      setNews(data);
      setIndex(1);
    } catch (error) {
      console.log("Error fetching news from source:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  useEffect(() => {
    if (source) fetchNewsfromSource();
  }, [source]);

  return (
    <Newscontext.Provider
      value={{
        news,
        setCategory,
        index,
        setIndex,
        setSource,
        darkTheme,
        setDarkTheme,
        fetchNews,
      }}
    >
      {children}
    </Newscontext.Provider>
  );
};

export default Context;
