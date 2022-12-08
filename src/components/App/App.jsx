import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/blogSlice";
import styles from './App.module.css'
import Main from '../Main'



const App = () => {
    const offset = useSelector((state) => state.articles.offset)
    const dispatch = useDispatch();
    const token = useSelector((state)=>state.auth.token);
    
    useEffect(() => {
    const props = { offset : offset , token : token };
        dispatch(fetchArticles(props) );
    },[dispatch,offset, token])


    return (
        <div className={styles.container}>
            <Main />
        </div>
    )
}

export default App;
