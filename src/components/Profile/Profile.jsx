import React from "react";
import styles from "./Profile.module.css"
import { useForm,FormProvider } from "react-hook-form";
import { object,string } from "yup";
import Input from "../Input/Input";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCredentials } from "../../store/authSlice";


const validationSchema = object().shape({
  username: string().required("Обязательное поле").min(7, 'Имя должно быть от 7 символов').max(20, 'Имя должно быть до 20 символов'),
  email: string().required("Обязательное поле").email("Почтовый адрес не корректен"),
  password: string().required("Обязательное поле").min(6, "Пароль должен быть от 6 символов").max(40, "Пароль должен быть до 40 символов"),
  avatar: string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    )
    .required('Введите корректный URL')
});

const Profile = () => {
  const dispatch = useDispatch();
  const currState = useSelector((state) => state.auth);
  console.log('currState', currState);
  const header = `${currState.token}`;
  console.log('token', header)
  const formProviderProps = useForm({
    defaultValues: {
      username: `${currState.username}`,
      email: `${currState.email}`,
      password: ``,
      avatar: `${currState.image}`
    },
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = data => {
    console.log('data', data)
    axios.put("https://blog.kata.academy/api/user",{
      user:{
        username : data.username,
        email : data.email,
        password : data.password,
        image : data.avatar
      }
    },
    {
      headers: {
        "Authorization" : `Token ${header}`}
    })
    .then((data) => { 
      dispatch(setCredentials(data.data));
    })
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Edit Profile</div>
      <FormProvider {...formProviderProps}>
        <form className={styles.form} onSubmit={formProviderProps.handleSubmit(onSubmit)}>
          <Input inputName={"username"} placeholder={"Username"} label={"Username"} />
          <Input inputName={"email"} placeholder={"Email Adress"} label={"Email"} />
          <Input inputName={"password"} placeholder={"New Password"} label={"New Password"} type={"password"} autoComplete={'on'} />
          <Input inputName={"avatar"} placeholder={"Avatar image"} label={"Avatar image (url)"} />
          <button type={"submit"} className={styles.button}>Save</button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Profile;