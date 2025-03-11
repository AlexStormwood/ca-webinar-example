import { useState } from 'react';
import './App.css'
import { PokemonDataViewer } from './PokemonDataViewer';

function App() {

  let [searchName, setSearchName] = useState("pikachu");

  return (
    <>
      <h1>Super Cool Pokedex</h1>

      <label htmlFor="nameInput">Pokemon Name:</label>
      <input type="text" name="nameInput" id="nameInput" value={searchName} onChange={(event) => setSearchName(event.target.value)} />
      <PokemonDataViewer pokemonName={searchName} />
    </>
  )
}

export default App
