import Link from "next/link";
import Image from "next/image";

export const BlogCard = ({ recipe }) => {

    const { title, slug, cookingTime, thumbnail } = recipe.fields



    return (
        <div className="card">
            <div className="fetured">
                <Image src = {`https:${thumbnail.fields.file.url}`} 
                width = {thumbnail.fields.file.details.image.width} 
                height = {thumbnail.fields.file.details.image.height} />
            </div>

            <div className="content">

                <div className="info">
                    <h3>{ title }</h3>
                    <p>Takes approx { cookingTime } mins to make</p>
                </div>

                <div className="actions">
                    <Link href = {`/recipes/${slug}`}><a>Cook this</a></Link>
                </div>
            </div>

            {/*Style css*/}

            <style jsx>{`

            .card {
          height: 100%;
          width:100%;
          overflow:hidden;
        }

        .fetured {
    width: 100%;
    overflow: hidden;
    height: 300px;
}
        
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          margin: 0;
          position: relative;
        }
        .info {
          padding: 16px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        
        .actions a {
          color: #fff;
          background: #f01b29;
          padding: 16px 24px;
          text-decoration: none;
        }
            
            `}</style>

           
        </div>
    )
}
export default BlogCard;