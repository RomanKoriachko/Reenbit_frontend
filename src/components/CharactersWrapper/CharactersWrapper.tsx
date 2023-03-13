import { useEffect } from 'react'
import {
    clearCharacterDataState,
    fetchCharacters,
} from '../../redux/charactersData'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Link } from 'react-router-dom'
import './CharactersWrapper.css'
import CharacterItem from '../CharecterItem/CharacterItem'

type Props = {}

type CharactersArr = {
    id: number
    image: string
    name: string
    gender: string
    status: string
    species: string
    origin: {
        name: string
    }
    type: string
}

const CharactersWrapper = (props: Props) => {
    const charactersData = useAppSelector((state) => state.characterDataStore)
    const searchData = useAppSelector((state) => state.filterDataState)
    const dispatch = useAppDispatch()

    const raw = localStorage.getItem('page')
    let localPageData = 1
    if (raw) {
        localPageData = JSON.parse(raw)
    }

    useEffect(() => {
        dispatch(clearCharacterDataState())
        dispatch(
            fetchCharacters(
                `https://rickandmortyapi.com/api/character?page=${localPageData}`
            )
        )
    }, [localPageData]) // eslint-disable-line react-hooks/exhaustive-deps

    // Sorting Arr

    let sortedArr = [...charactersData]

    let sortedCharacterArr: [] | CharactersArr[] = []
    if (sortedArr.length > 0) {
        sortedCharacterArr = sortedArr[0].results.slice().sort(function (a, b) {
            var nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
    }

    const localSearchData = localStorage.getItem('searchinput')

    let searchArr
    if (searchData !== '') {
        searchArr = sortedCharacterArr.filter((element: CharactersArr) =>
            element.name.toLowerCase().includes(searchData.toLowerCase())
        )
    } else if (searchData === '' && localSearchData !== null) {
        searchArr = sortedCharacterArr.filter((element: CharactersArr) =>
            element.name.toLowerCase().includes(localSearchData.toLowerCase())
        )
    } else {
        searchArr = [...sortedCharacterArr]
    }

    return (
        <div className="characters-wrapper">
            {charactersData.length > 0
                ? searchArr.map((el: CharactersArr) => (
                      <div className="character-item" key={el.id}>
                          <Link to={`/${el.id}`}>
                              <CharacterItem
                                  image={el.image}
                                  name={el.name}
                                  species={el.species}
                              />
                          </Link>
                      </div>
                  ))
                : undefined}
        </div>
    )
}

export default CharactersWrapper
