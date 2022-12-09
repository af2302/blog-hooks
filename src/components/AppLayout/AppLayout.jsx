import { useSelector } from "react-redux";
import { Route, Routes } from 'react-router';
import Header from '../Header'
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn';
import Profile from '../Profile/Profile';
import App from '../App';
import FullArticle from '../FullArticle/FullArticle';

import CreateArticle from "../CreateArticle";
import EditArticle from "../EditArticle/EditArticle";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


const AppLayout = () => {
    const isAuth = !!useSelector((state) => state.auth.token);
    return (
        <>
            <Routes>
                <Route path="/" element={<Header />} >
                    <Route path="articles/:slug" element={<FullArticle />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/new-article" element={<CreateArticle />} />
                    <Route path="*" element={<App />} />
                    <Route path="/" element={<App />} />
                    <Route path="articles" element={<App />} />
                    <Route path="/new-article" element={<SignIn />} />
                    <Route path="/sign_in" element={<SignIn />} />
                    <Route path="/sign_up" element={<SignUp />} />
                    <Route element={<ProtectedRoute isAuth={isAuth} />}>
                        <Route path="/articles/:slug/edit" element={<EditArticle />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}


export default AppLayout;