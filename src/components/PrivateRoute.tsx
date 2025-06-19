import { Navigate, replace } from "react-router-dom";
import {getRole, getToken} from "../services/auth";
import type { ReactElement } from "react";

interface PrivateRouteProps {
    children: ReactElement;
    allowedRoles: string[];
}

const PrivateRoute = ({children, allowedRoles}: PrivateRouteProps) => {
    const token = getToken();
    const role = getRole() || '';

    if (!token) {
        // The user is not logged in
        return <Navigate to="/login" replace/>;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />
    }

    return children;
};

export default PrivateRoute;