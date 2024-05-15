import '../styles/component-styles.css'

export default function Card({card, pokeData, setPokeData, shuffleArray, clickedNum, highScore, setHighScore}) {


    function endGame() {
            const updatedPokeData = pokeData.map(pokemon => {
                const updatedPokemon = { ...pokemon, clicked: false }
                return updatedPokemon
            })

            setPokeData(updatedPokeData);
            if (clickedNum > highScore) {
                setHighScore(clickedNum);
            }

            alert('Game Over');
    }
    
    function handleClick() {
        if (card.clicked === false) {
            const updatedCard = { ...card, clicked: true };
            const updatedPokeData = pokeData.map(pokemon =>
                pokemon.id === updatedCard.id ? updatedCard : pokemon
            )
            
            shuffleArray(updatedPokeData);
        } else {

            endGame();
           
            
        }
    }

    return (
        <button className='card' onClick={handleClick}>
            <img src={card.photoURL} />
            <h3>{card.name}</h3>
        </button>
    )

}