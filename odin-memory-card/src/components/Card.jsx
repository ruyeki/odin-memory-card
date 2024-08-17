import GetPokemon from "../api/Pokemon";
import React from "react";
import { useEffect, useState } from "react";

function Card() {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);


    return(
            <div>
                <GetPokemon  score = {score} setScore = {setScore} bestScore = {bestScore} setBestScore = {setBestScore}/>
            </div>

            
        );
}

export default Card;