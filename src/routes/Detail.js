/*eslint-disable*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
//import styled from 'styled-components'

// let Box = styled.div`
//   padding : 20px;
//   background : grey;
// `;
// let YellowBtn = styled.button`
//   background : yellow;
//   color : black;
//   padding : 10px;
// `;

 

function Detail(props){
    let [chance,upChance] = useState('true');
    useEffect(()=>{
        setTimeout(()=>{
            upChance(!chance);
        },2000)
    })

    let {id}=useParams();
    let goods=props.data.find(function(x){
        return x.id==id
    })
    let num=Number(id);

    return(
        <div className="container">

            {/* <Box>
                <YellowBtn>버튼</YellowBtn>
            </Box> */}
            {
                chance ? <div>2초이내 구매시 할인</div> : null
            }

            <div className="row">
                <div className="col-md-6">
                <img src={process.env.PUBLIC_URL + '/img/goods'+(num+1)+'.png'} width="50%" />
                </div>
                <div className="col-md-6">
                <h4 className="pt-5">{goods.title}</h4>
                <p>{goods.content}</p>
                <p>{goods.price}</p>
                <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    )
}
export default Detail