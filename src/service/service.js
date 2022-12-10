import axios from "axios";


export async function putData(data, slug, header, tags) {
  await axios.put(`https://blog.kata.academy/api/articles/${slug}`, {
    article: {
      slug: slug,
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: tags
    }
  }, {
    headers: {
      "Authorization": `Token ${header}`
    }
  }
  )
}

export async function deleteLike( slug, header) {
  await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite` , {
    headers: { 'Authorization': `Token ${header}` }
}) 
}

export async function postLike( slug, header ) {
  await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`,{
    slug : slug
}, { headers: { 'Authorization': `Token ${header}` } }
)
}

export async function deleteArticle( slug, header ) {
  await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
    headers: { 'Authorization' : `Token ${header}` }
}
)
}

