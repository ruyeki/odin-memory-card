import { useEffect, useState } from "react";

function GetPokemon({ onPokemonFetched, score, setScore, bestScore, setBestScore }){

    const [pokemon, setPokemon] = useState([]);
    const [finalUrl, setFinalUrl] = useState(null);
    const [clickedPokemon, setClickedPokemon] = useState([]);


    let pokemon_list = ['ditto', 'pikachu', 'charmander', 'squirtle', 'bulbasaur', 'mewtwo', 'mew', 'jigglypuff', 'geodude'];
    let url = 'https://pokeapi.co/api/v2/pokemon/';

    const generateUrl = () => {
            // Create an array of promises by fetching data for the first 9 Pokémon
            const promise = [];
            for(let i = 0; i<9; i++){
                let pokemon = pokemon_list[Math.floor(Math.random() * pokemon_list.length)];
                let final_url = url + pokemon;
                promise.push(
                    fetch(final_url)
                    .then(response => response.json())
                    .then(data => ({
                        pokemonName: data.species.name,
                        sprite: data.sprites.front_default
                    }))
                );
            }

            // Wait for all fetch operations to complete, then store the data in the setPokemons state
            Promise.all(promise)
                .then((results) => setPokemon(results))
                .catch((error) => console.log(error));
        };


    const fetchPokemon = async () => {
        if(finalUrl){
            try{
                const response = await fetch(finalUrl);
                const data = await response.json();
                setPokemon(data.species.name)

                if(onPokemonFetched){
                    onPokemonFetched(data);
                }
            }  catch(error){
                console.log(error);
        }
        }
    }

    useEffect(()=>{

        generateUrl();

    }, []);

    useEffect(()=>{

        console.log("Clicked Pokemon", clickedPokemon);

    }, [clickedPokemon]);




    useEffect(()=>{

        fetchPokemon();

    }, [finalUrl]);


    function handleClick(pokemonName){
        setClickedPokemon((prevState) => {

            if (prevState.includes(pokemonName)) {
                console.log(pokemonName, "Clicked twice");
                // Handle logic for a duplicate click, like resetting the score
                if (score > bestScore) {
                    setBestScore(score);
                }
                setScore(0); // Reset the score if the Pokémon was clicked twice
                setClickedPokemon([]);
            } else {
                // Increment score if it's a new click
                setScore(prevScore => prevScore + 1);
            }
    
            // Add the current Pokémon to the clickedPokemon array only if it hasn't been clicked before
            const updatedClickedPokemon = prevState.includes(pokemonName)
                ? prevState
                : [...prevState, pokemonName];
    
            console.log("Updated Clicked Pokemon:", updatedClickedPokemon); // Log the updated array
            return updatedClickedPokemon;
        });

        generateUrl();

    }

    return(
        <div>

            {pokemon.map((pokemons, index) => (
                <img 
                    key={index} 
                    src = {pokemons.sprite} 
                    alt = {pokemons.pokemonName} 
                    onClick = {()=>handleClick(pokemons.pokemonName)} 
                />
            ))}

            <h3>Score: {score}</h3>
            <h3>Best Score: {bestScore}</h3>
        </div>

    )
    
}

export default GetPokemon;