import { AppProps } from "next/app";
import { NextPage } from "next/types";

export type CustomPage = NextPage & {
    requiresAuth: boolean;
    redirectUnauthenticatedTo?: string;
    redirectAuthenticatedTo?: string;
};
export interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: CustomPage;
}