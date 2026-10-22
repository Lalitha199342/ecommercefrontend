import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "./components/ThemeContext.jsx";
import { SearchProvider } from "./components/SearchContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </SearchProvider>
  </StrictMode>
)
export default App
