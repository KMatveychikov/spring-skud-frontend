import EmployeeTable from "./components/EmployeeTable";
import {Route, Routes, useRoutes} from "react-router";
import PassTable from "./components/PassTable";
import WorkDaysTable from "./components/WorkDaysTable";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {useContext} from "react";
import {Context} from "./index";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import EmployeeRegistrationForm from "./components/EmployeeRegistrationForm";
import {observer} from "mobx-react-lite";


function App() {
    const {store} = useContext(Context);
    const isAuth = store.isAuth;
    return (

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route element={<LoginForm/>} path={"/"}/>
                <Route element={<EmployeeTable/>} path={"/employee"}/>
                <Route element={<PassTable/>} path="/passes"/>
                <Route element={<WorkDaysTable/>} path="/workdays"/>
                <Route element={<EmployeeRegistrationForm/>} path="/add_employee"/>
            </Routes>
        </BrowserRouter>


    );
}

export default App;
