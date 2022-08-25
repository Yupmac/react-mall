import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState, createContext } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import bg from './img/bg.png';
import data from "./data.js";
import Detail from "./pages/Detail";
import About from "./pages/About";
import Event from "./pages/Event";
import Card from "./components/Card";
import axios from "axios";
import Cart from "./pages/Cart";

export let Context1 = createContext()

function App() {
  let [ shoes, setShoes ] = useState(data);
  let navigate = useNavigate();
  let [ stock, setStock ] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">슈킹 ShoeKing</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>홈</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>장바구니</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail/0') }}>상세페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg' style={{ backgroundImage: 'url('+ bg +')'}}></div>
            <div className='container'>
              <div className='row'>
              {
                shoes.map((a, i) => {
                  return (
                    <Card shoes= {shoes[i]} i={i}></Card>
                  )
                })
              }
              </div>
            </div>
            <button onClick={() => {
              // 로딩중UI 띄우기
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => { 
                let copy = [ ...shoes, ...result.data ]
                setShoes(copy)
                // 로딩중UI 숨기기
              })
              .catch((error) => {
                // 로딩중UI 숨기기
                console.log('에러났다')
              })
            }}>버튼</button>
          </>
        } />
        
        <Route path="/detail/:id" element= { 
          <Context1.Provider value={ {stock, shoes} }>
            <Detail shoes={ shoes } />
          </Context1.Provider>
          } 
        />
        <Route path="/cart" element={ <Cart /> } />

        <Route path="/about" element={ <About /> }>
          <Route path="member" element={ <div>멤버들</div> }></Route>
          <Route path="location" element={ <div>위치정보임</div> }></Route>
        </Route>
        <Route path="/event" element={ <Event /> }>
          <Route path="one" element={ <div>첫 주문시 양배추즙 서비스</div> }></Route>
          <Route path="two" element={ <div>생일기념 쿠폰받기</div> }></Route>
        </Route>
        <Route path="*" element={ <div>없는 페이지입니다</div> } />
      </Routes>

    </div>
  );
}

export default App;