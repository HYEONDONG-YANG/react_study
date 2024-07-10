/*eslint-disable*/

import './App.css';
import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js'
import axios from 'axios'
function App() {
  return (
    <div className="App">

    <Routes>
      <Route path="/" element={
        <>
          <Header></Header>
          <Main></Main>
        </>
       } />
      <Route path="/best" element={ 
        <>
          <Header></Header>
          <div>best페이지임</div> 
        </>
      } />
      <Route path="/detail/:id" element={ 
        <>
          <Header></Header>
          <Detail data={data}/>
        </>
      } />
      <Route path="*" element={
        <>
          <div>없는페이지요</div>
          <Link to='/'>홈으로</Link>
        </>
      }></Route>
      <Route path ="/about" element={
        <>
          <Header></Header>
          <About/>
        </>
      }>
        <Route path="member" element={<>우리의 구성원입니다.</>}></Route>
        <Route path="location" element={<>우리의 위치입니다.</>}></Route>
      </Route>
    </Routes>

    </div>
  );
}

function Header(){
  let navigate = useNavigate();
  return(
    <>
      <div className="navbar" bg="light" data-bs-theme="light">
        <div className="container">
          <Navbar.Brand onClick={()=>{ navigate('/')}}>이e든든e식품</Navbar.Brand>
        </div>
      </div>
      <div className="navbar" bg="light" data-bs-theme="light">
        <div className="container">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/best')}}>베스트</Nav.Link>
            <Nav.Link onClick={()=>{ navigate(-1)}}>이전</Nav.Link>
            <Nav.Link onClick={()=>{ navigate(1)}}>다음</Nav.Link>
          </Nav>
          <Nav className="me-auto" style={{float:"left"}}>
            <Nav.Link onClick={()=>{ navigate('/about')}}>회사소개</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about/member')}}>구성원</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about/location')}}>회사위치</Nav.Link>
          </Nav>
        </div>
      </div>
    </>
  )
}

function Main(){
  let [goods] = useState(data);
  return(
    <>
      <div className="main-bg"></div>

      <div className="container" style={{marginTop : '10px'}}>
        <div className="row">
        {
          goods.map(function(a,i){
            return(
              <Goods goods={a} i={i}/>
            )
          })
        }
        </div>
      </div> 
      <><button onClick={()=>{
        axios.get('/orders')
        .then((data)=>{
          console.log(data)
        },null,null)
      }}>버튼</button></>
    </>
  )
}
function About(){
  return(
    <div>
      <h4>회사정보입니다</h4>
      <Outlet></Outlet>
    </div>
  )
}


function Goods(props){
  let navigate = useNavigate();
  return(
      <div className="col">
        <img src={process.env.PUBLIC_URL + '/img/goods'+(props.i+1)+'.png'} width="80%" onClick={()=>{navigate('/detail/'+props.i)}}/>
        <h4>{props.goods.title}</h4>
        <p>{props.goods.price}</p>
      </div>
    )
}


export default App;
