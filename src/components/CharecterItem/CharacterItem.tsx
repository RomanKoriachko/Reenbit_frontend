import './CharacterItem.css'

type CharacterElementsType = {
    image: string
    name: string
    species: string
}

const CharacterItem = ({ image, name, species }: CharacterElementsType) => {
    return (
        <>
            <img className="character-img" src={image} alt="" />
            <div className="character-desc">
                <p className="name">{name}</p>
                <p className="species">{species}</p>
            </div>
        </>
    )
}

export default CharacterItem
