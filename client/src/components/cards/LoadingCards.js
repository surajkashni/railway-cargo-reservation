import React from 'react';
import {Card,Skeleton} from 'antd';


const LoadingCards=({count})=>{
    
        const card=()=>{
            let cards=[];
        for(let i=0;i<count;i++){
            cards.push(
       <Card className="col m-3">
         
         <Skeleton active></Skeleton>
     </Card> 
            );
            }
            return cards;
        }
    
    return(
       <div className="row pb-5">{
      card()
       }</div>
        
    );
}
 export default LoadingCards;