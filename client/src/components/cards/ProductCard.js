import React from "react";
import {Card,Skeleton} from 'antd';
import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom';
//  import showAverage from '../../functions/rating';
const {Meta} =Card;
const ProductCard=({product})=>{
    //destt
    const {title,description,images,slug}=product;
    // return(
        // <>
        // {product && product.ratings && product.ratings.length>0?(showAverage(product)):(<div className="text-center pt-1 pb-3">No Rating yet</div>)}

        // <Card cover={
        //     <img src={images&&images.length?images[0].url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAcrfpTtlzlvMlfP4qGGGY_ZVgauhv2nIYc_NBOLmpOH11UPf3qZhJTRxD5Aj_PHOw47G-WxcK&usqp=CAc"}
        //     style={{height:"190px",objectFit:"cover"}}
        //     className="p-1"
        //    />
        // }
        // actions={[<Link to={`/product/${slug}`}><EyeOutlined className="text-warning"/><br/> View Product</Link>,<><ShoppingCartOutlined className="text-danger" /><br/>Add to cart</>]}
        // >
        //     <Meta title={title} description={`${description && description.substring(0,40)}...`}/>

        // </Card>
        // </>
    // )
}

export default ProductCard;