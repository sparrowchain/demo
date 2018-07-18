import React, { Component } from 'react';
import styled from "styled-components";
import mikeImg from "./images/mike.jpg";
import mandeepImg from "./images/mandeep.png";
import swarupImg from "./images/swarup.jpg";
import {observer,inject} from "mobx-react";
import {NavLink} from "react-router-dom";
import sentImg from "./images/sent-icon.png";
import arrowImg from "./images/arrow.png";

var keys = {

    "michael":{
                publicKey:"GCPUFASY45R44U4XEI4ECF5EUT2RJ4OALGH6SYMLHPU64V7MWGCNPOAP",
                secret:"SD2R5HKOKXG2ILFXPN46SJQN3QZPZ5ILU443OQBHDOPUA7IG3IHX76HG",
                img:mikeImg,
                fullName:"Michael Wong"
              },
    "mandeep":{
                publicKey:"GDBCZNAVDS7HWRU57AT5OM2DSDHA3SZDPHT4M6GEBMRMGC22QXX2ERQ5",
                secret:"SD5IKEMU4YIJRRLKXWWHVF2A3DLHPJVZGDDPOGINRLASXAI32PP4MIUU",
                img:mandeepImg,
                fullName:"Mandeep Json"

              },
  "swarup":{
    publicKey:"GASYBFYQ77TOUXHUFKFHOZTZZE2RXUXAT3TJIZ6C5QXZPI3DTIQL3YDI",
    secret:"SA7NS47GMK22XW4B7IXPRQCH7D4AIIG2DPN4YVWMEKNUSKA55TL3GYYQ",
              img:swarupImg,
              fullName:"Swarup"

                      }
}

const StyledA=styled.a`
text-decoration: none;
color:white;


`

const Column=styled.div`
display:flex;
flex-direction:column;
`;

const Image = styled.img`
width:250px;
`;


const StyledLink = styled(NavLink)`
text-decoration: none;
margin:10px;
  color:white;
 `;
const StyledProfile = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:90%;
background-color:#373d3c;
border-radius:0%;
margin:10px;
padding:10px;
 `;
const MainDiv = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
height:100vh;
padding:10px;
background-color:black;

 `;
 const SmallAvator = styled.img`
   border-radius:50%;
   width:50px;
   padding:10px;
 `;
 const SmallText = styled.p`
   font-size:10px;
   word-break: break-all;
   margin:10px;

 `;
 const Button = styled.button`
 border-radius: 3px;
 padding:5px;
 margin: 20px;;
 color: white;
 background-color: #f2713a;
 border: 0px solid green;
 width:100%;
 `;

 const MidText = styled.p`
   font-size:20px;
   word-break: break-all;
   margin:10px;
   color:white

 `;




@inject('store')
@observer
class SendFund extends Component{

constructor(props){
  super(props);
  console.log(this.props.store.user);

  this.state={
    sent:false,sending:false,txUrl:'',
    fund2send:'',skill2send:''
  }

}
send(){

  var from=keys[this.props.store.user].secret;
  var to=keys[this.props.user].publicKey;
  var amount=this.state.fund2send;
  var skill=this.state.skill2send;
  if(amount>0 && skill!=''){
  this.setState({sending:true});
  var queryString = 'http://13.251.129.74:8001/sendFund/'+from+'-'+to+'-'+amount+'-'+skill;

  fetch(queryString)
    .then(response=>response.json())
    .then(data=>{
      this.setState({sending:false});
      this.setState({sent:true});
      console.log(data.data);
      this.setState({txUrl:data.data});
    })
}
  //console.log(queryString);


  //this.setState({sent:true});
  //this.setState({sending:false});
}

updateItem(e,key){
  var value = e.target.value;
  if(key=='fund'){
    this.setState({fund2send:value});
  }else{
    this.setState({skill2send:value});
  }
}


render(){
  if(this.state.sent){


    return(
      <MainDiv>
      <Image src={sentImg}/>
      <Column>
      <StyledA href={this.state.txUrl} target='_blank'>View Transaction</StyledA>
      <StyledLink to={'/'+this.props.store.user}> Go Back</StyledLink>
      </Column>
      </MainDiv>
    );


  }else{



    if(this.state.sending){
      return(
        <MainDiv>
  <MidText>Sending Transaction....</MidText>
  </MainDiv>

)}

  return(



    <MainDiv>
    <StyledProfile>
    <div>
    <SmallAvator src={keys[this.props.store.user].img}/>
    <SmallAvator src={arrowImg}/>

    <SmallAvator src={keys[this.props.user].img}/>
    </div>
      <MidText>Amount of fund to send :</MidText>
      <input type='number' placeholder='e.g : 10 SPC' value={this.state.fund2send} onChange={(e)=>this.updateItem(e,'fund')}/>
      <MidText>Skillset : </MidText>
      <input type='text' placeholder='e.g : Android' value={this.state.skill2send} onChange={(e)=>this.updateItem(e,'skill')}/>
      <Button onClick={()=>this.send()}>Send to {this.props.user}</Button>

      </StyledProfile>
      <StyledLink to={'/'+this.props.store.user}> Go Back</StyledLink>

    </MainDiv>
  );
  }
}





}

export default SendFund;
