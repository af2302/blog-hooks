import axios from "axios";
import { useNavigate } from "react-router";



const onSubmit = (data, slug , header) => {
    
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
        useNavigate("/");
      }
    }
    
    )
}



export default onSubmit;