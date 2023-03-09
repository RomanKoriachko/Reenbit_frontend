import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './container/App/App'
import { store } from './redux/store'
import reportWebVitals from './reportWebVitals'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <GoogleOAuthProvider clientId="964905779160-jpqhn39537tvr1k3ggg4vjproo4vdkht.apps.googleusercontent.com">
                <App />
            </GoogleOAuthProvider>
        </Provider>
    </BrowserRouter>
)

reportWebVitals()
