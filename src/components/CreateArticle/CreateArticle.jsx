import React from "react";
import { array, object,string } from "yup";
import { useSelector } from "react-redux";
import axios from "axios";
import FormArticle from "../FormArticle/FormArticle";
import { useNavigate } from "react-router-dom";

const validationSchema = object().shape({
  title: string().required("Обязательное поле"),
  description: string().required("Обязательное поле"),
  text: string().required("Обязательное поле"),
  tags: array().required('Обязательное поле')
});

const defaultValues = {
  title: ``  ,
  description: ``,
  text: ``,
  tags: [{}]
}

const CreateArticle = (  ) => {
  const currState = useSelector((state) => state.auth);
  const header = `${currState.token}`;
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const tagList = data.tags.map((el) => el.value);
    axios.post('https://blog.kata.academy/api/articles',{
      article : {
        title : data.title,
        description : data.description,
        body : data.text,
        tagList : tagList
      }     
    },{
      headers: {
        "Authorization" : `Token ${header}`}
    }
    ).then((res) => {
      if (res.status === 200){
        navigate("/");
      }
    })
  }
  return (
    <>
      <FormArticle validationSchema={validationSchema} defaultValues={defaultValues} onSubmit={onSubmit} />
    </>
  )
}


export default CreateArticle;