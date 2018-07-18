import React, { Component } from 'react';
import {BrowserRouter as Router,Route,NavLink,Redirect} from "react-router-dom";
import styled from "styled-components";
import Wallet from "./Wallet";
import {observer,inject} from "mobx-react";
import SendFund from "./SendFund";
import ShowFriend from "./ShowFriend";
import logo from "./images/logo.jpeg";


import './App.css';


const SmallText = styled.p`
  font-size:10px;
  word-break: break-all;
  margin:20px;
  font-family:"Verdana";
  color:grey;


`;
const StyledLink = styled(NavLink)`
text-decoration: none;
  background-color:grey;
  color:white;
  padding:5px;
  border: 2px solid white;
  margin:10px;
`;

const MainDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:2px;
height:100vh;
width:100%;
background-color:grey;
`;

const LoginDiv=styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:2px;
height:100vh;
width:100%;
background-color:white;
`;

const LogoImg=styled.img`
width:300px;
`;

const Mandeep=()=>(
  <Wallet user='mandeep'/>
);
const Michael=()=>(
  <Wallet user='michael'/>
);

const Send=({match})=>(
  <SendFund user={match.params.user}/>
);
const User=({match})=>(
  <ShowFriend user={match.params.user}/>
);
 const Login=()=>(
  <LoginDiv>
  <LogoImg src={logo}/>
   <SmallText>Pick one account to login</SmallText>

  <StyledLink to="/michael">Michael</StyledLink>
  <StyledLink to="/mandeep">Mandeep</StyledLink>

  </LoginDiv>
);

@inject('store')
@observer
class App extends Component {





  render() {
    return (
      <Router>

      <MainDiv>

              <Route exact path="/" component={Login}/>
              <Route exact path="/mandeep" component={Mandeep}/>
              <Route exact path="/michael" component={Michael}/>
              <Route exact path="/sendFund/:user" component={Send}/>
              <Route exact path="/user/:user" component={User}/>


      </MainDiv>

      </Router>
    );
  }
}

export default App;
