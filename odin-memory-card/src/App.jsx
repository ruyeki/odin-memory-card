import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'
import GetPokemon from './api/Pokemon'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (

      <>
        <h2>Pokemon Memory Game</h2>
        <h3>Don't click on the same pokemon twice! </h3>
        <Card />
      </>
  );
}

export default App
