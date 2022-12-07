import React from "react"

import Header from '../Header'
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn';
import Profile from '../Profile/Profile';
import App from '../App';
import FullArticle from '../FullArticle/FullArticle';
import { useSelector } from "react-redux";

import { Route, Routes } from 'react-router';
import CreateArticle from "../CreateArticle";
import EditArticle from "../EditArticle/EditArticle";

const AppLayout = () => {
    const isAuth = !!useSelector((state) => state.auth.token);
    return (
        <>
            <Routes>
                <Route path="/" element={<Header />}>
                    {isAuth ? (
                        <>
                            <Route path="articles" element={<App />} />
                            <Route path="*" element={<App />} />
                            <Route path="/" element={<App />} />
                            <Route path="articles/:slug" element={<FullArticle />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/new-article" element={<CreateArticle />} />
                            <Route path="/articles/:slug/edit" element={<EditArticle />} />
                        </>
                    ) : (
                        <>
                            <Route path="articles" element={<App />} />
                            <Route path="/" element={<App />} />
                            <Route path="*" element={<App />} />
                            <Route path="/new-article" element={<SignIn />} />
                            <Route path="articles/:slug" element={<FullArticle />} />
                            <Route path="/sign_in" element={<SignIn />} />
                            <Route path="/sign_up" element={<SignUp />} />
                        </>
                        )
                    }
                </Route>
            </Routes>
        </>
    )
}


export default AppLayout;