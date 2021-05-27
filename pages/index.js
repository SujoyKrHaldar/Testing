import Head from 'next/head'
import { createClient } from 'contentful';
import BlogCard from "../components/BlogCard"

export async function getStaticProps(){

  //createClient() --> make a connectiion with our content ful backend cms space, and access the data.
    const client = createClient({

        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY, 
    })   

  //getEntries() --> get the all data from contentful space.  
    const res = await client.getEntries({ content_type : "recipe"})

    return{
      props : {
        recipes : res.items
      }
    }


}



export default function Recipes({ recipes }) {
  //console.log(recipes)
  return (
    <>
    <Head>
        <title>Recipe Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
{/*First type of writing css style --->*/}

    <p style={{paddingBottom :'3rem',fontSize :"2.5rem", fontWeight:"700"}}>Latest Recipes </p> 

    <div className="recipe-list">

      {recipes.map(recipe => (

          <BlogCard key = {recipe.sys.id} recipe = {recipe} />

      ))}

{/*Second type of writing css style --->*/}
      <style jsx>{`                                 

        .recipe-list{
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 20px;
        }

      `}</style>

    </div>
    
    </>
  )
}