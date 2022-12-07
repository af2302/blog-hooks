import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/blogSlice";
import Article from "../Article/Article";
import Loader from "../Loader/Loader";
import styles from "./ArticleList.module.css"

const ArticleList = () => {
    const articles = useSelector((state) => state.articles.articles);
    const isLoading = useSelector((state) => state.articles.isLoading);
    const token = useSelector((state) => state.auth.token);
    const [currPage, setCurrent] = useState(1);
    const articlesCount = useSelector((state) => state.articles.articlesCount)
    const list = articles.slice(0,5);
    const dispatch = useDispatch();
    const props = { offset : 0 , token : token };
    return (
        <div className={styles.container}>
            {isLoading && <Loader />}
            {list.map((article,i) => 
                <Article key={i} {...article} />
            )}
            {!isLoading && <Pagination 
                sx={{p:1}}
                count={Math.ceil(articlesCount/5)}
                page={currPage}
                onChange={(_, num) => {
                    if (num === currPage) return {}
                    props.offset = num * 5;
                    dispatch(fetchArticles(props));
                    setCurrent(num);
                }}
            />}
        </div>
    )
}

export default ArticleList;