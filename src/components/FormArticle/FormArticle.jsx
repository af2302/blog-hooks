import { useEffect } from "react";
import Input from "../Input/Input";
import { useForm,FormProvider,useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "./FormArticle.module.css";

const FormArticle = ( { validationSchema , defaultValues , onSubmit } ) => {
    console.log("formD" , defaultValues);
  const formProviderProps = useForm({
    ...(defaultValues ? defaultValues : {}) ,
    resolver: yupResolver(validationSchema)
  });
  const { control } = formProviderProps;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });
  console.log('fields', fields);
useEffect(()=>{
    formProviderProps.reset(defaultValues)
// eslint-disable-next-line    
},[defaultValues])

  return (
    <>
      <FormProvider {...formProviderProps}>
        <div className={styles.wrapper}>
          <div className={styles.name}>Create new article</div>
          <form className={styles.form} onSubmit={formProviderProps.handleSubmit(onSubmit)}>
            <Input className={styles.title} inputName={"title"} placeholder={"Title"} label={"Title"} />
            <Input className={styles.description} inputName={"description"} placeholder={"description"} label={"Short description"}/>
            <Input className={styles.text} inputName={"text"} placeholder={"Text"} label={"Text"} type={"textarea"} />
              <div className={styles.tagsWrapper}>
            {fields.map((item, index) => {
            console.log('ITEM', item);
              return(
                <div key={item.id} className={styles.tagsContainer}>
                  <Input 
                    className={styles.tagsInput}
                    inputName={`tags.${index}.value`}
                    placeholder={"Tag"}
                    autoComplete="off"
                    />
                <button className={styles.delete} type={"button"} onClick={() => {
                  remove(`${index}`)}}>Delete</button>
                </div>
              )
            })
            }
            <button className={styles.add} type={"button"} onClick={() => append({})} disabled={fields.length > 3}>Add tag</button>
            </div>
            <button className={styles.submit} type={"submit"} >Send</button>
          </form>
        </div>
      </FormProvider>
    </>
  )
}


export default FormArticle;