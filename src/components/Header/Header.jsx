import React from "react";
import { Outlet } from "react-router";
import styles from './Header.module.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/authSlice";

const Header = () => {
    const isAuth = !!useSelector((state) => state.auth.token)
    const name = useSelector((state) => state.auth.username)
    const image = useSelector((state) => state.auth.image)
    const dispatch = useDispatch();
    const submitHandler = () => {
        dispatch(logOut());
    }
    return (
        <>
            <div className={styles.container}>
                <Link to={"/"} className={styles.name}> Realworld Blog </Link>
                { isAuth ? 
                    (<div className={styles.wrap}> 
                    <Link to={"/new-article"} className={styles.createArticle}> create article </Link>          
                    <Link to={"/profile"} className={styles.profile}> 
                        <div className={styles.username}>{name}</div>
                        <img className={styles.image} alt="img" src={`${image}`}/>
                    </Link>
                    <button className={styles.logout} onClick={() => submitHandler()}> Log Out </button>
                    </div>
                    ) : (
                    <div className={styles.wrapNoAuth}>           
                        <Link to={"/sign_in"} className={styles.in}> Sign In </Link>
                        <Link to={"/sign_up"} className={styles.up}> Sign Up </Link>
                    </div>
                    )    
                }
            </div>
            <Outlet />
        </>

    )
}


export default Header;