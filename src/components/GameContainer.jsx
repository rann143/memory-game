import { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import '../styles/component-styles.css'
import background from '../assets/thimo-pedersen-dip9IIwUK6w-unsplash.jpg'

export default function GameContainer() {
    const [highScore, setHighScore] = useState(0)
    const [pokeData, setPokeData] = useState([]);
    useEffect(() => {

        let isSubscribed = true

        async function getIndividualData(pokemon) {

            try {
                let url = pokemon.url;

                let response = await fetch(url)

                if (!response.ok) {
                    throw new Error("Network response was not OK")
                }

                let data = await response.json();

                let cleanedData = {
                    id: data.id,
                    name: data.name,
                    photoURL: data.sprites.front_default,
                    // clicked is not from API, I use this for the card game
                    clicked: false
                }

                return cleanedData

            } catch (err) {
                console.error('Error with fetch operation', err);
                throw err;
            }

        }

        function getPokeData() {

            fetch(`https://pokeapi.co/api/v2/pokemon?limit=21`)
                .then(response => response.json())
                .then(async function (allPokemon) {
                    const pokemonDataArray = await Promise.all(
                        // results is an array within the allPokemon JSON object
                        allPokemon.results.map(async (pokemon) => {
                        const data = await getIndividualData(pokemon)
                        return data
                    })
                    )
                    return pokemonDataArray
                })
                .then(dataArray => setPokeData(dataArray))

        }

        if (isSubscribed) {
            getPokeData()
        }
        
        return () => isSubscribed = false;
        
    }, [])

    const clickedArray = pokeData.filter(pokemon =>
        pokemon.clicked === true
    )


    const cardArray = pokeData.map(pokemon => 
        <Card
            card={pokemon}
            pokeData={pokeData}
            setPokeData={setPokeData}
            shuffleArray={shuffleArray}
            clickedNum={clickedArray.length}
            highScore={highScore}
            setHighScore={setHighScore}
            key={pokemon.id}
        />
    )

    function shuffleArray(array) {
        let copiedArray = [...array]
        let currentIndex = array.length;
        
        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [copiedArray[currentIndex], copiedArray[randomIndex]] = [
                copiedArray[randomIndex], copiedArray[currentIndex]];
        }

        setPokeData(copiedArray)
    }

    function resetGame() {
        const updatedPokeData = pokeData.map(pokemon => {
                const updatedPokemon = { ...pokemon, clicked: false }
                return updatedPokemon
            })

            shuffleArray(updatedPokeData)
        
    }

    //HANDLE A WIN
    if (clickedArray.length === 21) {
        setHighScore(21);
        resetGame();
        alert("You Win!");
    }

    console.log(pokeData)

    return (
        <>
            <h1>Memory Game</h1>
            <p>Get points by clicking on an image, but don&apos;t click on any more than once!</p>
            <button className="reset-btn" onClick={() => resetGame()}>Start New Game</button>
            <hr />
            <div className='container' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', borderRadius: '10px' }}>
            <div className="score-board">
                <div>Score: {clickedArray.length}</div>
                <div>High Score: {highScore}
            </div>
            </div>
            <div className="grid" >
                {cardArray}
                </div>
                </div>
            <span className='image-attribute'>Photo by <a href="https://unsplash.com/@thimo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Thimo Pedersen</a> on <a href="https://unsplash.com/photos/red-and-white-ladybug-toy-on-white-and-yellow-book-dip9IIwUK6w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  </span>
            
        </>
    )
    
}