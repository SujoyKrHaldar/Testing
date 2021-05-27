import { createClient } from 'contentful';
import Head from 'next/head'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {BLOCKS} from "@contentful/rich-text-types"
import Image from 'next/image';

const client = createClient({

  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY, 
})   


//get the static routes--->
export const getStaticPaths = async () =>{
  const res = await client.getEntries({
    content_type : "recipe"
  })

  const paths = res.items.map(item =>{
    return{
      params: {slug: item.fields.slug}
    }
  })
   
  return{
    paths,
    fallback: false
  }
}

//get the data---->(body)
export async function getStaticProps({ params }){

  const { items } = await client.getEntries({
    content_type : "recipe",
    'fields.slug': params.slug
  })

  return{
    props: {recipe : items[0]}
  }
}


export default function RecipeDetails({ recipe }) {
  console.log(recipe)

  const { featuredImage, title, cookingTime, ingredients, method} = recipe.fields

  return (
    <div>
    <Head>
        <title>Blog | { title }</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

      <div className ="banner">
        <Image src={`https:${featuredImage.fields.file.url}`}
               width={featuredImage.fields.file.details.image.width}
               height={featuredImage.fields.file.details.image.height}
        />
        <h2>{ title }</h2>
      </div> 

      <div className="info">
        <p>take about {cookingTime} mins to cook</p>
        <h3>Ingredients : </h3>

        {ingredients.map(ing =>(

            <span key={ing}>{ing}</span>
        ))}
      </div>

      <div className="method">
        <h3>Method:</h3>
        <div >{ documentToReactComponents(method , {

            renderNode : {

                [BLOCKS.EMBEDDED_ASSET]: node => 
                  <Image src = {`https:${node.data.target.fields.file.url}`} 
                  width={node.data.target.fields.file.details.image.width} 
                  height={node.data.target.fields.file.details.image.height}/>
            }
        }) }</div>
      </div>

      <style jsx>{`
          
          h2,h3{
            text-transform: uppercase;
          }
          .banner h2{
            margin: 0;
            background: #fff;
            display: inline-block;
            position: relative;
          }
          .info p{
            margin:0;
          }
          info h3 span::after{
            content:",";
          }
          info span:last-child::after{
            content:".";
          }
      
      `}</style>
    </div>
  )
}