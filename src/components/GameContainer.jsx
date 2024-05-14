import { useState, useEffect } from "react";

export default function GameContainer() {
    const [pokeCards, setPokeCards] = useState(['charizard', 'raichu', 'arbok', 'spearow', 'sandshrew', 'sandslash', 'snorlax', 'poliwrath', 'azurill', 'bastiodon', 'bibarel', 'bidoof']);


    useEffect(() => {
        let ignore = false;

        async function getPokeData(pokemon) {

            try {
                let response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
                )

                if (!response.ok) {
                    throw new Error("Netwok response was not OK");
                }

                let data = await response.json();

                let cleanedData = {
                    name: data.name,
                    photoURL: data.sprites.front_default
                }

                return cleanedData;
            } catch (err) {
                console.error("There was an error with the fetch operation", err);
                throw err;
            }
        }

        if (!ignore) {
            console.log(getPokeData('charizard'))
            
        }

        return () => ignore = true;

    }, [])


//     return (
//     <img src={pokeCards[0].photoURL}  />    
// )

}