import React from "react";

import "./PokeList.css";

export default function pokeList({ pokemon }) {
  function toUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return pokemon.map((p, i) => (
    <div className="List" key={i}>
      {toUpperCase(p.name)} <a href={p.url}>More info</a>
    </div>
  ));
}
