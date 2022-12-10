import { useEffect,useState } from "react";
import { useParams } from "react-router";
import Loader from "../Loader"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./FullArticle.module.css";
import redHeart from "../../img/redHeart.png";
import heart from "../../img/Vector.png";
import MarkdownBody from "../MarkdownBody/MarkdownBody";
import { deleteArticle, deleteLike, postLike } from "../../service/service";

const FullArticle = () => {
    const [fullArticle, setFullArticle] = useState({});
    const [isLoading, setISLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const { slug } = useParams();
    const currState = useSelector((state) => state.auth);
    const header = `${currState.token}`;
    const navigate = useNavigate();
  
    function getFullArticle(slug) {
        setISLoading(true);
        setTimeout( () => {         
        fetch(`https://blog.kata.academy/api/articles/${slug}`,{
            headers : { 'Authorization': `Token ${header}` }
        })
        .then(res => res.json())
        .then(data =>setFullArticle(data.article))
        setTimeout(()=>{setISLoading(false)},500)
        } , 0)
    }
    useEffect(() => {
       getFullArticle(slug);
// eslint-disable-next-line
    },[slug])

    const onDelete = () => {
        try {
            deleteArticle( slug, header);
            navigate("/");
        } catch (e) {
            throw new Error('deleting error', e.message)
        }
    }

    const like = () => {
        try {
            postLike(slug, header);
            setFullArticle((prev) => ({ ...prev, favorited: true }))
            setFullArticle((prev) => ({ ...prev, favoritesCount: fullArticle.favoritesCount + 1 }))
        } catch (e) {
            throw new Error('like Error', e.message)
        }
    }

    const unLike = () => {
        try {
            deleteLike(slug, header);
            setFullArticle((prev) => ({ ...prev, favorited: false }))
            setFullArticle((prev) => ({ ...prev, favoritesCount: fullArticle.favoritesCount - 1 }))
        } catch (e) {
            throw new Error('dislike Error ', e.message)
        }
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const date = new Date(fullArticle?.updatedAt);
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const day = date.getDate();

    const tags=fullArticle?.tagList?.filter((tag) => tag) ;
    const isItYours = currState?.username === fullArticle?.author?.username;

    return (
        <>
        { isLoading &&  <Loader />}
            { !isLoading &&
            <div className={styles.container} >
                <div className={styles.header}>
                    <div className={styles.another_wrapper}>
                        <div className={styles.title_wrapper}>
                            <div className={styles.title}>{fullArticle?.title}</div>
                            <div className={styles.likes}>
                            { header ? 
                                <button className={styles.like_button}>
                                    { fullArticle?.favorited ? 
                                        <img src={redHeart} alt="liked" onClick={() => unLike()}/> 
                                    :
                                        <img src={heart} alt="not_liked" onClick={() => like()}/>}
                                </button> 
                            : 
                            <img src={heart} alt="not_liked" />
                            }
                                <div className={styles.likes_count}>{fullArticle?.favoritesCount}</div>
                            </div>
                        </div>
                        <div className={styles.tags_wrapper}>
                            {tags?.map((tag, i) => {
                                return (
                                    <div className={styles.tags} key={i}>
                                        {tag}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.person_wrapper}>
                        <div className={styles.text_wrapper}>
                            <div className={styles.name}>{fullArticle?.author?.username}</div>
                            <div className={styles.date}>{month} {day}, {year}</div>
                        </div>
                            <img className={styles.image} alt="img" src={fullArticle?.author?.image} />
                    </div>
                </div>
                <div className={styles.description}>
                   <div className={styles.descriptionText}> {fullArticle?.description}</div>
                    { isItYours && <div className={styles.buttons}>
                        <button className={styles.delete} onClick={()=>setIsOpen(isOpen === false ? true : false)}>Delete</button>
                        <Link 
                        to={`/articles/${slug}/edit`} 
                        className={styles.edit} 
                        fullarticle={fullArticle} 
                        >Edit</Link>
                    </div>}
                    { isOpen && <div className={styles.modal}> 
                        <div className={styles.modal_title}> are you sure about this </div>
                            <div className={styles.modal_buttons}>
                                <button className={styles.modal_no} onClick={() => setIsOpen(false)}>No</button>
                                <button className={styles.modal_yes} onClick={() => onDelete()}>Yes</button>
                            </div>
                        </div>}
                </div>
                <div className={styles.markownbody}>
                    <MarkdownBody text={fullArticle?.body}/>
                </div>
            </div>}
        </>
    )
}


export default FullArticle;