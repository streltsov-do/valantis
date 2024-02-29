import { Routes, Route } from "react-router";
import { ARR_ROUTES } from "../../assets/constants";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Main = () => {
    return (
        <>
            <Header />
            <Routes>
                {ARR_ROUTES.map((val, idx) => (
                    <Route key={idx} path={val.path} element={val.element} />
                ))}
            </Routes>
            <Footer />
        </>
    );
};
