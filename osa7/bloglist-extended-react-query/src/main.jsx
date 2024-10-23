/** @format */

import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { StateContextProvider } from './context/stateContext'
import { queryClient } from './queryStore'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
