import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import NavigationEffects from './components/NavigationEffects.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import './styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <NavigationEffects />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
