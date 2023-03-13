import './Main.css'
import SearchInput from '../../components/SearchInput/SearchInput'
import PagesComponent from '../../components/PagesComponent/PagesComponent'
import CharactersWrapper from '../../components/CharactersWrapper/CharactersWrapper'

type Props = {}

const Main = (props: Props) => {
    return (
        <main className="main">
            <div className="container">
                <img className="logo" src="../../../images/logo.png" alt="" />
                <SearchInput />
                <CharactersWrapper />
                <PagesComponent />
            </div>
        </main>
    )
}

export default Main
