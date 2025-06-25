/**
 * Назначение: Программный редирект на страницу логина в api.ts при истечении сессии
 */

// Программно изменяет URL и генерирует событие для React Router
export const redirectToLogin = () => {
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
};