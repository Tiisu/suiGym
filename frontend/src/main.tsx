import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SuiProvider } from './components/SuiProvider.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SuiProvider>
      <App />
    </SuiProvider>
  </React.StrictMode>,
)