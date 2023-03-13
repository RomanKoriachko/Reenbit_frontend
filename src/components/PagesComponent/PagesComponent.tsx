import { useEffect } from 'react'
import { setArrOfPages } from '../../redux/arrOfPagesReducer'
import {
    clearCharacterDataState,
    fetchCharacters,
} from '../../redux/charactersData'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { goToPage, nextPage, prevPage } from '../../redux/pageReducer'
import './PagesComponent.css'

type Props = {}

const PagesComponent = (props: Props) => {
    const charactersData = useAppSelector((state) => state.characterDataStore)
    const pageState = useAppSelector((state) => state.pageState)
    const arrOfPages = useAppSelector((state) => state.arrOfPagesState)
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

    useEffect(() => {
        localStorage.setItem('arrOfPages', JSON.stringify(arrOfPages))
    }, [arrOfPages])

    const onNextPageClick = () => {
        dispatch(nextPage())
        if (
            localPageData >= 10 &&
            localPageData < 20 &&
            arrOfPages.includes(1)
        ) {
            getNextSetOfPages()
        } else if (
            localPageData >= 20 &&
            localPageData < 30 &&
            arrOfPages.includes(11)
        ) {
            getNextSetOfPages()
        } else if (
            localPageData >= 30 &&
            localPageData < 40 &&
            arrOfPages.includes(21)
        ) {
            getNextSetOfPages()
        } else if (
            localPageData >= 40 &&
            localPageData < 44 &&
            arrOfPages.includes(31)
        ) {
            getNextSetOfPages()
        }
    }
    const onPrevPageClick = () => {
        dispatch(prevPage())
        if (localPageData < 42 && arrOfPages.includes(41)) {
            getPrevSetOfPages()
        } else if (localPageData < 32 && arrOfPages.includes(31)) {
            getPrevSetOfPages()
        } else if (localPageData < 22 && arrOfPages.includes(21)) {
            getPrevSetOfPages()
        } else if (localPageData < 12 && arrOfPages.includes(11)) {
            getPrevSetOfPages()
        }
    }

    let lastPage = 42
    if (charactersData.length > 0) {
        lastPage = charactersData[0].info.pages
    }

    const getNextSetOfPages = () => {
        let newArr = []
        for (let i = 0; i < arrOfPages.length; i++) {
            newArr.push(arrOfPages[i] + 10)
        }
        dispatch(setArrOfPages(newArr))
    }
    const getPrevSetOfPages = () => {
        let newArr = []
        for (let i = 0; i < arrOfPages.length; i++) {
            newArr.push(arrOfPages[i] - 10)
        }
        dispatch(setArrOfPages(newArr))
    }

    function removeExcessiveNumber(value: number) {
        return value <= lastPage
    }

    // Disable hover on mobile
    if (
        'ontouchstart' in window ||
        (window.Touch && document instanceof Touch)
    ) {
        document.body.classList.remove('no-touch')
    } else {
        document.body.classList.add('no-touch')
    }

    return (
        <div className="row navigation">
            <button
                className="page-btns"
                onClick={onPrevPageClick}
                disabled={pageState <= 1}
            >
                Previous
            </button>
            <div className="pages-wrapper">
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
            </div>
            <button
                className="page-btns"
                onClick={onNextPageClick}
                disabled={pageState >= lastPage}
            >
                Next
            </button>
        </div>
    )
}

export default PagesComponent
