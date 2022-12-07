import React from "react";
import styles from "./Article.module.css"
import heart from "../../img/Vector.png"
import redHeart from "../../img/redHeart.png"
import { useNavigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { setLike, SetUnLike } from "../../store/blogSlice";


const Article = ({author,updatedAt,title,description,tagList,favoritesCount,slug,favorited}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

    const date = new Date (updatedAt);
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear();
    const day = date.getDate();
    const tags = tagList.filter((tag) => tag)
    const token = useSelector((state) => state.auth.token)
    const like = () => {
        axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`,{
            slug : slug
        }, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }
    )
    .then( (res) => res.data.article.slug)
    .then((res ) => dispatch(setLike(res)))
    }
    const unLike = () => {
        axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite` , {
            headers: {
                'Authorization': `Token ${token}`
            }
        }
    ).then( (res) => res.data.article.slug)
    .then( (res) => dispatch(SetUnLike(res)))
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.another_wrapper}>
                    <div className={styles.title_wrapper}>
                        <div className={styles.title} onClick={()=>{navigate(`../articles/${slug}`)}} >{title}</div>
                        <div className={styles.likes}>
                            { token ? 
                                <button className={styles.like_button}>
                                    { favorited ? 
                                        <img src={redHeart} alt="liked" onClick={() => unLike()}/> 
                                    :
                                        <img src={heart} alt="not_liked" onClick={() => like()}/>}
                                </button> 
                            : 
                            <img src={heart} alt="not_liked" />
                            }
                            <div className={styles.likes_count}>{favoritesCount}</div>
                        </div>
                    </div> 
                    <div className={styles.tags_wrapper}>
                    {tags.map((tag,i) => {
                        return (
                            <div className={styles.tags} key={i}> 
                                {tag ? tag : null}
                            </div>
                        )
                    })}
                    </div>
                </div>
                <div className={styles.person_wrapper}>
                    <div className={styles.text_wrapper}>
                        <div className={styles.name}>{author.username}</div>
                        <div className={styles.date}>{ month } { day }, { year }</div>
                    </div>
                        <img className={styles.image} alt="img" src={author.image}/>
                </div>
            </div>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    )
}

export default Article;