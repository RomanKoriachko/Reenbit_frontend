import {
    clearCharacterDataState,
    fetchCharacters,
} from '../../redux/charactersData'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './Main.css'
import CharacterItem from '../../components/CharecterItem/CharacterItem'
import SearchInput from '../../components/SearchInput/SearchInput'
import { Link } from 'react-router-dom'
import { goToPage, nextPage, prevPage } from '../../redux/pageReducer'

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
    const searchData = useAppSelector((state) => state.filterDataState)
    const pageState = useAppSelector((state) => state.pageState)
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

    // Pages

    const onNextPageClick = () => {
        dispatch(nextPage())
    }
    const onPrevPageClick = () => {
        dispatch(prevPage())
    }

    let lastPage = 42
    if (charactersData.length > 0) {
        lastPage = charactersData[0].info.pages
    }

    const [arrOfPages, setArrOfPages] = useState<number[]>([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ])

    const getNextSetOfPages = () => {
        let newArr = []
        for (let i = 0; i < arrOfPages.length; i++) {
            newArr.push(arrOfPages[i] + 10)
        }
        setArrOfPages(newArr)
    }
    const getPrevSetOfPages = () => {
        let newArr = []
        for (let i = 0; i < arrOfPages.length; i++) {
            newArr.push(arrOfPages[i] - 10)
        }
        setArrOfPages(newArr)
    }

    function removeExcessiveNumber(value: number) {
        return value <= lastPage
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
                <button
                    className="page-btns"
                    onClick={onPrevPageClick}
                    disabled={pageState <= 1}
                >
                    Previous
                </button>
                {arrOfPages.includes(1) ? undefined : (
                    <button className="page-btns" onClick={getPrevSetOfPages}>
                        ...
                    </button>
                )}
                {arrOfPages.filter(removeExcessiveNumber).map((element) => (
                    <button
                        className={`page-btns ${
                            localPageData === element ? 'active' : ''
                        }`}
                        key={element}
                        onClick={() => dispatch(goToPage(element))}
                    >
                        {element}
                    </button>
                ))}
                {arrOfPages.includes(lastPage) ? undefined : (
                    <button
                        className="page-btns"
                        onClick={getNextSetOfPages}
                        disabled={arrOfPages.includes(42)}
                    >
                        ...
                    </button>
                )}
                <button
                    className="page-btns"
                    onClick={onNextPageClick}
                    disabled={pageState >= lastPage}
                >
                    Next
                </button>
            </div>
        </main>
    )
}

export default Main
