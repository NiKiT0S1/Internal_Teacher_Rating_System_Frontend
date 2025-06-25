/**
 * Назначение: Корневой файл, который запускает React приложение
 * BrowserRouter – это компонент в React Router, 
 * который обеспечивает маршрутизацию на стороне клиента для вашего приложения.
 * Основная задача — управлять навигацией внутри веб-приложения,
 *  которое работает в браузере. Он позволяет менять URL-адрес и показывать разные страницы или компоненты без перезагрузки всей страницы
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'

// Создает корневой элемент React и оборачивает App в BrowserRouter
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
