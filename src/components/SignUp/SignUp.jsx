import styles from "./SignUp.module.css"
import { useForm,FormProvider } from "react-hook-form";
import { object,string,ref, boolean } from "yup";
import Input from "../Input/Input";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const validationSchema = object().shape({
  username : string().required().min(3,'Имя должно быть от 3 символов').max(20,'Имя должно быть до 20 символов'),
  email : string().required().email("Почтовый адрес не корректен"),
  password : string().required("Обязательное поле").min(6,"Пароль должен быть от 6 символов").max(40,"Пароль должен быть до 40 символов"),
  repeatPassword :string().oneOf([ref("password"), null], "Пароли должны совпадать"),
  checkbox : boolean()
  .oneOf([true,null], 'Вы должны согласиться с обработкой персональных данных'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const formProviderProps = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      checkbox: true,
    },
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = data => {
    console.log('DATA', data)
    console.log("dannie", data.username, data.email, data.password)

    axios.post(`https://blog.kata.academy/api/users`, {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      }
    })
      .then(navigate("/sign_in"))
      .catch((e) => {
        const errors = e.response.data;

        if (errors.errors.email) {
          formProviderProps.setError('email', {
            message: "Такой email уже существует"
          })
        }
        if (errors.errors.username) {
          formProviderProps.setError('username', {
            message: "Такой username уже существует"
          })
        }
      })
  };
  return (
    <div className={styles.wrapper}>
        <div className={styles.header}>Create new account</div>
        <FormProvider {...formProviderProps}>
          <form  className={styles.form} onSubmit={formProviderProps.handleSubmit(onSubmit)}>
            <Input inputName={"username"} placeholder={"Username"} label={"Username"} />
            <Input inputName={"email"} placeholder={"Email Adress"} label={"Email"} />
            <Input inputName={"password"} placeholder={"Password"} label={"Password"} type={"password"} autoComplete={'on'} />
            <Input inputName={"repeatPassword"} placeholder={"Password"} label={"Repeat Password"} type={"password"} autoComplete={'on'} />
            <Input inputName={"checkbox"} type={"checkbox"} />
            <button type={"submit"} className={styles.button}>Create</button>
            <div className={styles.bottom}>Already have an account? <Link to={"/sign_in"} className={styles.link}>Sign In.</Link></div>
          </form>
        </FormProvider>
      </div>
  );
}

export default SignUp;