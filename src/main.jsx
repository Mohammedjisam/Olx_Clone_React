import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {FirebaseContext } from './store/FirebaseContext'
import Context from './store/FirebaseContext'
import { db } from './firebase/config.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <FirebaseContext.Provider value={{db}}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
    
  </StrictMode>,
)
 