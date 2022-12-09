import { useState, useEffect } from "react";
import { array, object,string } from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import FormArticle from "../FormArticle/FormArticle";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const validationSchema = object().shape({
  title: string().required("Обязательное поле"),
  description: string().required("Обязательное поле"),
  text: string().required("Обязательное поле"),
  tags: array().required('Обязательное поле')
});

const getDefaultValues = ({ article }) => {
    if ( !article ) return
    return {
        title: article?.title,
        description: article?.description,
        text: article?.body,
        tags: article?.tagList.map((el,id) => ({id : id , value : el}))
    }
}

const EditArticle = (  ) => {
  const navigate = useNavigate();
  const  { slug } = useParams();
  const [fullArticle, setFullArticle] = useState({});
  const defaultValues = getDefaultValues(fullArticle);
  const currState = useSelector((state) => state.auth);
  const header = `${currState.token}`;

  async function getFullArticle(slug) {
    await fetch(`https://blog.kata.academy/api/articles/${slug}`)
      .then(res => res.json())
      .then((data) => {
        setFullArticle(data);
        if (currState.username !== data?.article?.author?.username) {
          navigate('/')
        } else return
      })
  }  

  useEffect(() => {
      getFullArticle(slug);
  }, [slug])


  const onSubmit = (data) => {
    const tagList = data.tags.map((el) => el.value);
    axios.put(`https://blog.kata.academy/api/articles/${slug}`, {
      article: {
        slug: slug,
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagList
      }
    }, {
      headers: {
        "Authorization": `Token ${header}`
      }
    }
    ).then((res) => {
      if (res.status === 200){
        navigate("/");
      }
    }
    
    )
  }
  return (
    <>
      <FormArticle validationSchema={validationSchema} defaultValues={defaultValues} onSubmit={onSubmit} />
    </>
  )
}


export default EditArticle;