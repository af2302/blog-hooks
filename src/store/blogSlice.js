import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (props , { rejectWithValue }) => {
    try {/*  https://blog.kata.academy/api/       https://api.realworld.io/api/*/
        const res = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${props.offset - 5}`,{
            headers : { 'Authorization': `Token ${props.token}` }
        });
        if (!res.ok) {
            throw new Error(`${res.status}`);
        }
        return await res.json();
    } catch (err){
        return rejectWithValue(err);
    }
});

const blogSlice = createSlice ({
    name : 'articles',
    initialState : {
        articles: [],
        articlesCount: 0,
        error: false,
        isLoading: false,
        currPage: 1,
        offset: 5,
    },
    reducers: {
        setArticles(state, action) {
            state.articles = action.payload;
        },
        setLike(state,action){
          state.articles.find((el) => el.slug === action.payload).favorited = true;
          state.articles.find((el) => el.slug === action.payload).favoritesCount++
        },
        SetUnLike(state,action){
            state.articles.find((el) => el.slug === action.payload).favorited = false;
            state.articles.find((el) => el.slug === action.payload).favoritesCount--
        }
    },
    extraReducers: {
        [fetchArticles.fulfilled]: (state, action) => {
            state.articles = [...state.articles, ...action.payload.articles];
            state.isLoading = false;
            state.articlesCount = action.payload.articlesCount;
        },
        [fetchArticles.pending]: (state) => {
            state.articles = [];
            state.isLoading = true;
            state.error = false;
        },
    },
})

export const {setArticles, setLike, SetUnLike} = blogSlice.actions;

export default blogSlice.reducer;