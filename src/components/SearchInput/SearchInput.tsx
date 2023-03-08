import { changeSearchInput } from '../../redux/filterData'
import { useAppDispatch } from '../../redux/hooks'
import './SearchInput.css'

type Props = {}

const SearchInput = (props: Props) => {
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
                value={localSearchData ? localSearchData : ''}
            />
        </div>
    )
}

export default SearchInput
