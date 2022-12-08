import { useController, useFormContext  } from "react-hook-form";
import styles from "./Input.module.css";


const Input = ({inputName,placeholder,label,type="text", tags, ...props}) => {
    const { control, defaultValues, formState : { errors } } = useFormContext();
    const { field : {
        onChange,name,value
    } } = useController({ name:inputName , control , defaultValues })

    if  ( type === "textarea"){
        return (
        <div className={styles.wrapper}>  
            {label&& <label>{label}</label>}
            <textarea onChange={onChange} value={value } placeholder={placeholder} type={type} {...props} ></textarea>
            <div className={styles.error}>{errors[name]?.message}</div>
        </div>
        )
    }
    return(<>
        { type === "checkbox" ? ( 
        <div className={styles.checkbox_wrapper}> 
            <input onChange={onChange} name="checkbox" placeholder={placeholder} type={type} className={styles.checkbox} checked={value} value={value} />
            <label className={styles.checknox_label}>I agree to the processing of my personal information</label>
            <div className={styles.error}>{errors[name]?.message}</div>
        </div>
        ):(
        <div className={styles.wrapper}>  
            {label&& <label>{label}</label>}
            <input onChange={onChange} value={ value } placeholder={placeholder} type={type} {...props} />
            <div className={styles.error}>{errors[name]?.message}</div>
        </div>) }</>
    )
}

export default Input;