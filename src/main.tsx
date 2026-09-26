import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './styles/source.css';
import './styles/app.css';
import './styles/home-hero.css';
createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
