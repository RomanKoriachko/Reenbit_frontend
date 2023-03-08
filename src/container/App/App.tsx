import Main from '../Main/Main'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './reset.css'
import CharacterPage from '../../pages/CharacterPage/CharacterPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:characterId" element={<CharacterPage />} />
        </Routes>
    )
}

export default App
