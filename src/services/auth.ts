const TOKEN_KEY = 'jwt_token';
const ROLE_KEY = 'user_role';

export const saveToken = (token: string, role: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getRole = () => {
    return localStorage.getItem(ROLE_KEY);
};

export const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
};