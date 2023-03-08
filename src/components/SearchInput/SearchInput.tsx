import { changeSearchInput } from '../../redux/filterData'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './SearchInput.css'

type Props = {}

const SearchInput = (props: Props) => {
    const searchData = useAppSelector((state) => state.filterDataState)
    const dispatch = useAppDispatch()

    const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchInput(e.target.value))
    }

    const localSearchData = localStorage.getItem('searchinput')

    return (
        <div className="search row">
            <div className="search-img"></div>
            <input
                className="search-input"
                type="text"
                placeholder="Filter by name..."
                onChange={changeSearch}
                value={
                    searchData === ''
                        ? localSearchData === null
                            ? searchData
                            : localSearchData
                        : searchData
                }
            />
        </div>
    )
}

export default SearchInput
