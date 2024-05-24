import { lazy } from "react";

export const HomePage = lazy(() => import("./HomePage.tsx"));
export const Profile = lazy(() => import("./Profile.tsx"));
export const Settings = lazy(() => import("./Settings.tsx"));
export const Register = lazy(() => import("./Register.tsx"));
export const ErrorPage = lazy(() => import("./ErrorPage.tsx"));
