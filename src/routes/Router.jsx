import React from "react";
import { Route, Routes } from "react-router-dom";
import CardsPage from "./../pages/CardsPage";
import FavoriteCardsPage from "./../pages/FavoriteCardsPage";
import MyCardsPage from "./../pages/MyCardsPage";
import AboutPage from "./../pages/AboutPage";
import LoginPage from "./../pages/LoginPage";
import RegisterPage from "./../pages/RegisterPage";
import SandBox from "../pages/SandBox";
import ErrorPage from "../pages/ErrorPage";
import ROUTES from "./routesDict";
import BCardDetailsPage from "../pages/BCardDetailsPage";

function Router() {

    return (

        <Routes>
            <Route path={ROUTES.root} element={<CardsPage />} />
            <Route path={ROUTES.favorite} element={<FavoriteCardsPage />} />
            <Route path={ROUTES.myCards} element={<MyCardsPage />} />
            <Route path={ROUTES.about} element={<AboutPage />} />
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.register} element={<RegisterPage />} />
            <Route path={ROUTES.bcardsPage} element={<BCardDetailsPage />} />
            <Route path={ROUTES.sandBox} element={<SandBox />} />
            <Route path="/*" element={<ErrorPage />} />
        </Routes>

    );

}

export default Router;