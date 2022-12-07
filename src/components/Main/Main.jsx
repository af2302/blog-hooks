import React from "react";
import ArticleList from "../ArticleList";
import styles from './Main.module.css'

const Main = () => {
    return (
        <div className={styles.container}>
            <ArticleList />
        </div>
    )
}

export default Main;