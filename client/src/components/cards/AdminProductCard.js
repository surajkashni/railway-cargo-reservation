import React from "react";
import {Card} from 'antd';
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom';
import image from '../images/images.jfif'
const {Meta} =Card;


const AdminProductCard=({product,handleRemove})=>{
    //destt
    const {title,source,destination,price,quantity,category,sold,slug}=product;
    const total=quantity+sold;
    return(
        <Card cover={
            <img src={image}
            style={{height:"190px",objectFit:"cover"}}
            className="p-1"
           />
        }
        actions={[<Link to={`/admin/product/${slug}`}><EditOutlined className="text-warning"/></Link>,<DeleteOutlined className="text-danger" onClick={()=>handleRemove(slug)}/>]}
        >
            <Meta title={title} /><hr/>

            Price:Rs. {price}<br/><hr/>
            Total: {total}<br/>
            Sold:  {sold}<br/>
            Available:  {quantity}<br/>
            Source-Destination: {source}-{destination}<br/>
            Category: {category}

        </Card>
    );
}

export default AdminProductCard;