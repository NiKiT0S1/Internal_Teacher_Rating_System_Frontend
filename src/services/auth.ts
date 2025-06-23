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

// export function isTokenExpired(): boolean {
//     const token = getToken();
//     if (!token) {
//         return true;
//     }

//     try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const exp = payload.exp * 1000;
//         return Date.now() > exp;
//     }
//     catch (error) {
//         return true;
//     }
// }