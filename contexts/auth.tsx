import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { CustomAppProps, CustomPage } from "../lib/custom-page";


type User = { token: string } | null

const AuthContext = React.createContext(
    {} as {
        user: User;
        authenticate: (newToken: string) => Promise<boolean>;
        logout: (redirectLocation: string) => void;
        isLoading: boolean;
        isAuthenticated: boolean;
        token?: string;
    }
);


type AuthProviderProps = {
    children: React.ReactElement<CustomAppProps, CustomPage>
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isAuthenticated = !!user;



    const logout = (redirectLocation: string | undefined) => {
        Cookies.remove("token");
        // unauthenticateAPI();
        setUser(null);
        setIsLoading(false);
        router.push(redirectLocation || "/");
    };

    const authenticate = async (token: string) => {
        setIsLoading(true);
        // authenticateAPI(token);
        return await fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify({
                token: token
            })
        }).then(response => {
            return response.json()
        }).then(responseJson => {
            setUser(responseJson);
            Cookies.set("token", token);
            return true;
        }).catch(error => {
            // console.log({ error });
            // unauthenticateAPI();
            setUser(null);
            Cookies.remove("token");
            return false
        }).finally(() => {
            setIsLoading(false);
        })
    }


    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) return;
        authenticate(token);
    }, []);

    useEffect(() => {
        const Component = children.type;

        if (!Component.requiresAuth && isAuthenticated && Component.redirectAuthenticatedTo) {
            router.push(Component.redirectAuthenticatedTo)
            return
        }

        // If it doesn't require auth, everything's good.
        if (!Component.requiresAuth) return;

        // If we're already authenticated, everything's good.
        if (isAuthenticated) return;

        // If we don't have a token in the cookies, logout
        const token = Cookies.get("token");
        if (!token) {
            return logout(Component.redirectUnauthenticatedTo);
        }

        // If we're not loading give the try to authenticate with the given token.
        if (!isLoading) {
            authenticate(token);
        }

    }, [isLoading, isAuthenticated, children.type.requiresAuth]);

    return (
        <AuthContext.Provider
            value={{
                user,
                authenticate,
                logout,
                isLoading,
                isAuthenticated: !!user,
                token: Cookies.get("token"),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);