/** @format */

import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'

import { StateContextProvider } from './context/stateContext'
import { Provider } from 'react-redux' // pitää poistaa

import App from './App'
import store from './store' // pitää poistaa

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </StateContextProvider>
  </StrictMode>,
)
