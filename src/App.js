import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import PokeList from "./Components/PokeList/PokeList";
import Loading from "./Components/Loading/Loading";
import Pagination from "./Components/Pagination/Pagination";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    setIsLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setIsLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p));
      });

    return () => cancel();
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    return prevPageUrl !== null ? setCurrentPageUrl(prevPageUrl) : null;
  }

  return (
    <div className="App">
      <h1>PokeWiki</h1>
      {isLoading ? <Loading /> : null}
      <PokeList pokemon={pokemon} />
      <Pagination next={goToNextPage} prev={goToPrevPage} show={prevPageUrl} />
    </div>
  );
}
