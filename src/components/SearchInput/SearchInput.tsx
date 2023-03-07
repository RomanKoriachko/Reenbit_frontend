import { changeSearchInput } from '../../redux/filterData'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './SearchInput.css'

type Props = {}

const SearchInput = (props: Props) => {
    const searchState = useAppSelector((state) => state.filterDataState)
    const dispatch = useAppDispatch()

    const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchInput(e.target.value))
    }

    return (
        <div className="search row">
            <div className="search-img"></div>
            <input
                className="search-input"
                type="text"
                placeholder="Filter by name..."
                onChange={changeSearch}
                value={searchState}
            />
        </div>
    )
}

export default SearchInput
