/**
 * Назначение: Проверяет права доступа к страницам по ролям
 * Оборачивает все защищенные маршруты в App.tsx
 */

import { Navigate, replace } from "react-router-dom";
import {getRole, getToken} from "../services/auth";
import type { ReactElement } from "react";

// Интрефейс для компонента PrivateRoute, который описывает какие свойства и методы должны быть у объекта
interface PrivateRouteProps {
    // Страница, к которой будет доступ
    children: ReactElement;
    // Список разрешенных ролей
    allowedRoles: string[];
}

// Компонент PrivateRoute, который проверяет права доступа к странице
const PrivateRoute = ({children, allowedRoles}: PrivateRouteProps) => {
    // Проверяет, залогинен ли пользователь
    const token = getToken();
    // Проверяет, какая у него роль
    const role = getRole() || '';

    // Если пользователь не залогинен - перенаправляет на страницу логина
    if (!token) {
        // The user is not logged in
        return <Navigate to="/login" replace/>;
    }

    // Если роль пользователя не соответствует одной из разрешенных ролей - перенаправляет на страницу логина
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />
    }

    // Если пользователь залогинен и его роль соответствует одной из разрешенных ролей - отображает компонент
    return children;
};

export default PrivateRoute;