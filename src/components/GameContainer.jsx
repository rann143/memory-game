import { useState, useEffect } from "react";
import PokeCard from '../classes'

export default function GameContainer() {
    // const [pokeCards, setPokeCards] = useState(['charizard', 'raichu', 'arbok', 'spearow', 'sandshrew', 'sandslash', 'snorlax', 'poliwrath', 'azurill', 'bastiodon', 'bibarel', 'bidoof']);
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
                    photoURL: data.sprites.front_default
                }

                return cleanedData

            } catch (err) {
                console.error('Error with fetch operation', err);
                throw err;
            }

        }

        function getPokeData() {

            fetch(`https://pokeapi.co/api/v2/pokemon?limit=12`)
                .then(response => response.json())
                .then(async function (allpokemon) {
                    const pokemonDataArray = await Promise.all(
                        allpokemon.results.map(async (pokemon) => {
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


        console.log(pokeData)
        
        return () => isSubscribed = false;
        
    },[])
    
}