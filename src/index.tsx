import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './views/App';
import { UserProvider } from './context/UserContext'
import './styles/global.scss';

const container: any = document.getElementById('app')
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>
);