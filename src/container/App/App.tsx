import Main from '../Main/Main'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './reset.css'
import CharacterPage from '../../pages/CharacterPage/CharacterPage'
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'

type responseType = {
    credential: string
}

declare var google: any

function App() {
    const [user, setUser] = useState<Object | null>(null)

    function handleCallbackResponse(response: responseType) {
        const userObject: Object = jwt_decode(response.credential)
        setUser(userObject)
        // localStorage.setItem('userData', JSON.stringify(userObject))
    }

    // const raw = localStorage.getItem('userData')
    // let userlocalData: null | Object = null
    // if (raw) {
    //     userlocalData = JSON.parse(raw)
    // }

    function handleSignOut() {
        // setUser(null)
        // localStorage.setItem('userData', JSON.stringify(null))
        setUser(null)
    }

    if (user === null) {
        document.getElementById('signInDiv')?.classList.remove('hide')
    } else {
        document.getElementById('signInDiv')?.classList.add('hide')
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id:
                '964905779160-jpqhn39537tvr1k3ggg4vjproo4vdkht.apps.googleusercontent.com',
            callback: handleCallbackResponse,
        })
        google.accounts.id.renderButton(document.getElementById('signInDiv'), {
            theme: 'outline',
            size: 'large',
        })
    }, [])

    return (
        <div>
            {user === null}
            <div id="signInDiv" className=""></div>
            {user !== null && (
                <button onClick={() => handleSignOut()}>Sign Out</button>
            )}
            {user && (
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/:characterId" element={<CharacterPage />} />
                </Routes>
            )}
        </div>
    )
}

export default App
