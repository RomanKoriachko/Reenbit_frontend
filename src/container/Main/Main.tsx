import { fetchCharacters } from '../../redux/charactersData'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './Main.css'
import CharacterItem from '../../components/CharecterItem/CharacterItem'
import SearchInput from '../../components/SearchInput/SearchInput'

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

const Main = (props: Props) => {
    const charactersData = useAppSelector((state) => state.characterDataStore)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCharacters())
    }, [])

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
    if (localSearchData !== '' && localSearchData !== null) {
        searchArr = sortedCharacterArr.filter((element: CharactersArr) =>
            element.name.toLowerCase().includes(localSearchData.toLowerCase())
        )
    } else {
        searchArr = [...sortedCharacterArr]
    }

    return (
        <main className="main">
            <div className="container">
                <img className="logo" src="../../../images/logo.png" alt="" />
                <SearchInput />
                <div className="characters-wrapper">
                    {charactersData.length > 0
                        ? searchArr.map((el: CharactersArr) => (
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
