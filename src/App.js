import './App.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import bg from './img/bg.png';
import { useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail.js";
import About from "./pages/About.js";
import Event from "./pages/Event.js";
import Card from "./components/Card.js";

function App() {

  let [ shoes ] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">발신발</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>홈</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>상세페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className='main-bg'></div>
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
          </>
        } />
        
        <Route path="/detail/:id" element={ <Detail shoes={shoes} /> } />
        <Route path="/about" element={ <About /> }>
          <Route Route path="member" element={ <div>멤버들</div> }></Route>
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