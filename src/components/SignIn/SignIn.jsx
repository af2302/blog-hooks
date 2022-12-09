import styles from "./SignIn.module.css"
import { useForm,FormProvider } from "react-hook-form";
import { object,string} from "yup";
import Input from "../Input/Input";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";

const validationSchema = object().shape({
  email : string().required("Обязательное поле"),
  password : string().required("Обязательное поле"),
});
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formProviderProps = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = data => {
    axios.post("https://blog.kata.academy/api/users/login",{
      user : {
        email : data.email,
        password : data.password
      }
    })
    .then((res) => { 
      dispatch(setCredentials(res.data));
      if (res.status === 200) {
        navigate("/articles")
      }
    })
    .catch((e)=>{
      const err = e?.response?.data;
      if (err?.errors){
        formProviderProps.setError('password',{
          message : 'Неправильный email или пароль'
        })
      }
    })
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Sign In</div>
      <FormProvider {...formProviderProps}>
        <form className={styles.form} onSubmit={formProviderProps.handleSubmit(onSubmit)}>
          <Input inputName={"email"} placeholder={"Email"} label={"Email"} />
          <Input inputName={"password"} placeholder={"Password"} label={"Password"} type={"password"} autoComplete={'on'} />
          <button type={"submit"} className={styles.button}>Login</button>
          <div className={styles.bottom}>Don't have an account? <Link to={"/sign_up"} className={styles.link}>Sign Up.</Link></div>
        </form>
      </FormProvider>
    </div>
  );
}

export default SignIn;
