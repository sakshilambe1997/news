import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Home.css"
import NewsArticle from "./../../components/NewsArticle/NewsArticle.js"


function Home() {
 const [news,setNews]=useState([])
 const [searchQuery,setSearchQuery]=useState('Pune')

 const loadNews = async()=>{
   try{
    const response =await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&from=2024-09-08&to=2024-09-08&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`)

    setNews(response.data.articles)
   }

   catch(error){
    console.log(error)
   }
  
 }

 useEffect(()=>{
    loadNews()
 },[])

 useEffect(()=>{
    loadNews()
 },[searchQuery])


  return (
    <div>
        <h1 className='news-heading'>News App</h1>

        <input type='text'
         className='search-input'
          value={searchQuery}
          onChange={(e)=>{
            setSearchQuery(e.target.value)
          }}></input>

        <div className='news-container'>

        {
            news.map((newsArticle,index)=>{
                const {author,title,description,url,urlToImage,publishedAt}=newsArticle

                return(
                   <NewsArticle author={author} title={title} description={description}  url={url} urlToImage={urlToImage} publishedAt={publishedAt}/>
                )

            })
        }
        </div>
    </div>
  )
}

export default Home