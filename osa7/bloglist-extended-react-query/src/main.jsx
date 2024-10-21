/** @format */

import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux' // pitää poistaa

import { StateContextProvider } from './context/stateContext'
import { queryClient } from './queryStore'

import App from './App'
import store from './store' // pitää poistaa

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </StateContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
