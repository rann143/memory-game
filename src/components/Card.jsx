import '../styles/component-styles.css'

export default function Card({card}) {

    return (
        <button className='card'>
            <img src={card.photoURL} />
            <h3>{card.name}</h3>
        </button>
    )

}