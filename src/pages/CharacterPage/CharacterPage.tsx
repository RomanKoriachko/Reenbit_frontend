import './CharacterPage.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchCharacters } from '../../redux/charactersData'
import { Link } from 'react-router-dom'

type Props = {}

const CharacterPage = (props: Props) => {
    const { characterId } = useParams()

    const characterData = useAppSelector((state) => state.characterDataStore)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCharacters())
    }, [dispatch])

    let currentData
    if (characterData.length > 0) {
        for (let i = 0; i < characterData[0].results.length; i++) {
            if (characterData[0].results[i].id === Number(characterId)) {
                currentData = characterData[0].results[i]
            }
        }
    }

    return (
        <div className="character-page">
            <Link to={`/`}>
                <div className="back-btn row">
                    <div className="arrow-back-img"></div>
                    <div>GO BACK</div>
                </div>
            </Link>
            <div className="container">
                <div className="character-page-content">
                    <div className="character-page-img">
                        <img src={currentData?.image} alt="" />
                    </div>
                    <div className="character-page-name">
                        {currentData?.name}
                    </div>
                    <p className="character-page-information">Informations</p>
                    <div className="character-page-item">
                        <p>Gender</p>
                        <p>{currentData?.gender}</p>
                        <div className="underline"></div>
                    </div>
                    <div className="character-page-item">
                        <p>Status</p>
                        <p>{currentData?.status}</p>
                        <div className="underline"></div>
                    </div>
                    <div className="character-page-item">
                        <p>Specie</p>
                        <p>{currentData?.species}</p>
                        <div className="underline"></div>
                    </div>
                    <div className="character-page-item">
                        <p>Origin</p>
                        <p>{currentData?.origin.name}</p>
                        <div className="underline"></div>
                    </div>
                    <div className="character-page-item">
                        <p>Type</p>
                        <p>
                            {currentData?.type === ''
                                ? 'Unknown'
                                : currentData?.type}
                        </p>
                        <div className="underline"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterPage
