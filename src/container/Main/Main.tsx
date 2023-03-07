import { fetchCharacters } from '../../redux/charactersData'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './Main.css'
import CharacterItem from '../../components/CharecterItem/CharacterItem'
import SearchInput from '../../components/SearchInput/SearchInput'

type Props = {}

type CharacterData = {
    info: {
        count: number
        next: null | string
        pages: number
        prev: null | string
    }
    results: CharactersArr[]
}
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

const Main = (props: Props) => {
    const charactersData = useAppSelector((state) => state.characterDataStore)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCharacters())
    }, [])

    const sortedArr: CharacterData = Object.assign({}, charactersData)
    if (sortedArr.results) {
        sortedArr.results.sort(function (a, b) {
            var nameA = a.name.toLowerCase(),
                nameB = b.name.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
    }

    return (
        <main className="main">
            <div className="container">
                <img className="logo" src="../../../images/logo.png" alt="" />
                <SearchInput />
                <div className="characters-wrapper">
                    {charactersData !== null
                        ? sortedArr.results.map((el: CharactersArr) => (
                              <div className="character-item" key={el.id}>
                                  <CharacterItem
                                      image={el.image}
                                      name={el.name}
                                      species={el.species}
                                  />
                              </div>
                          ))
                        : undefined}
                </div>
            </div>
        </main>
    )
}

export default Main
