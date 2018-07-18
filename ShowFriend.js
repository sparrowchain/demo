import React, { Component } from 'react';
import styled from "styled-components";
import mikeImg from "./images/mike.jpg";
import mandeepImg from "./images/mandeep.png";
import swarupImg from "./images/swarup.jpg";
import {observer,inject} from "mobx-react";
import {NavLink} from "react-router-dom";


let color=['#e29c91','#91e2dd','#87b0f2','#b875ef','#ea7ec8','#ea526e','#b4e8a7'];

const MainDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin:2px;
height:100vh;
width:100%;
background-color:black;
`;

const Button = styled.button`
border-radius: 3px;
padding: 0.25em 1em;
margin: 0 1em;
color: green;
border: 2px solid green;
`;


const StyledLink = styled(NavLink)`
text-decoration: none;
  background-color:#f2713a;
  color:white;
  padding:5px;
`;

const AccountLink=styled.a`
text-decoration: none;
color:white;


`

const StyledFriendCard=styled.div`

display:flex;
flex:1;
justify-content:space-between;
align-items:center;
border:0px solid red;
border-radius:1px;
 padding:5px;
border-bottom-style: dashed;
border:1px solid grey;
background-color:#373d3c;

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

const StyledFriendList = styled.div`
display:flex;
flex:1;
flex-direction:column;
margin:10px;
width:90%;
 border-radius:0%;
border:0px solid red;
border-radius:1px;
`;



const SkillDiv = styled.div`
display:flex;
flex-wrap:wrap;

`;

const SkillList = styled.div`
display:flex;
flex:1;
flex-direction:row;
flex-wrap:wrap;
border:0px solid grey;
border-radius:0px;
width:100%;
background-color:black;
justify-content:center;
align-items:center;

`;
const SkillBox = styled.div`
background-color:${props=>props.color};
border-radius:0%;
margin:2px;

`;

const SkillText = styled.p`
font-size:10px;
color:black;
word-break: break-all;
margin:3px;
font-weight: bold;

padding:2px;
`;

const SmallText = styled.p`
  font-size:10px;
  word-break: break-all;
  margin:2px;
  font-family:"Verdana";
  color:white;

`;


const MidText = styled.p`
  font-size:20px;
  word-break: break-all;
  margin:10px;
  color:white;
  font-family:"Verdana";

`;
const BigText = styled.h2`
  color:#f2713a;
  word-break: break-all;
  margin:10px;
  font-family:"Verdana";

`;

const Avator = styled.img`
  border-radius:50%;
  width:100px;
`;
const SmallAvator = styled.img`
  border-radius:50%;
  width:50px;
`;


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


var wallets={
  "michael":{
            fund:0,
            skill:{}

   },
  "mandeep":{
            fund:0,
            skill:{}
},
"swarup":{
          fund:0,
          skill:{}
}
}
const FriendCard=({user})=>(
  <StyledFriendCard>
  <SmallAvator src={keys[user].img}/>
  <SmallText>{keys[user].fullName}</SmallText>
  <StyledLink to={'/sendFund/'+user}>send fund</StyledLink>
  </StyledFriendCard>)

const showFriendList=(user)=>{
  var result = [];
  var data = keys;
  Object.keys(keys).forEach(function(key){
    if(key!=user){
    result.push(
      <div>
          <FriendCard user={key}/>
      </div>
    );
  }
  });
return result;

}

const displaySkill=(user)=>{

  var result=[];

  var data = wallets[user].skill;
/*
  var data = {};
  array.map((item,index)=>{
    var skill = item;
    if(data[skill]){
      data[skill]++
    }else{
      data[skill]=1;
    }

  });
*/
  Object.keys(data).forEach(function(key) {
    console.log('SKILL Key : ' + key + ', Value : ' + data[key])
    result.push(
      <SkillBox color={color[Math.floor((Math.random() * 6))]}>
        <SkillText>{key} : {data[key]}</SkillText>
      </SkillBox>
    )

  })


  return result;

};



@inject('store')
@observer
class ShowFriend extends Component{

constructor(props){
  super(props);
  console.log(this.props.store.user);

  //this.props.store.user=this.props.user;
  this.state=({
    loaded:false,
    fund:'loading...'
  }
  );
}

randomNumber(){
  Math.floor((Math.random() * 6));
}

loadWallet(){

var key = keys[this.props.user].publicKey;

fetch('https://horizon-testnet.stellar.org/accounts/'+key)
  .then(response=>response.json())
  .then(data=>{
    console.log(data.balances[0].balance);
    var fund = data.balances[0].balance;
    fund=parseFloat(fund).toFixed(2);
    this.setState({fund:fund});
  })
}

componentDidMount(){
  var array={};
  var user=this.props.user;
  var key = keys[this.props.user].publicKey;
  fetch('https://horizon-testnet.stellar.org/accounts/'+key+'/transactions?limit=200&order=asc')
    .then(response=>response.json())
    .then(data=>{
      var data2 = data._embedded.records;

      Object.keys(data2).forEach(function(key2) {

        //console.log('Key : ' + key + ', Value : ' + data2[key].memo)
        var skill = data2[key2].memo;
        if(skill!='undefined' && skill!=undefined && data2[key2].source_account!=key){
          if (array[skill]){
            array[skill]++;
          }else{
            array[skill]=1;
          }
          wallets[user].skill = array;
          console.log (wallets[user].skill);


          }



      });
      console.log(array);

       this.loadWallet();
      this.setState({loaded:true});

    }

    )

/*
  //var key='GBNXVB6IYH665OTKTPK2BWXAY7OG4REDI63XSIFIIVPRBDRBCFEE23YQ';
  //fetch('http://localhost:8001/loadSkills/'+keys[this.props.user].publicKey)
fetch('http://13.251.129.74:8001/loadSkills/'+key)

    .then(response=>response.json())
    .then(data=>{
        //var json = JSON.stringify(data);
        Object.keys(data).forEach(function(key) {
          console.log('Key : ' + key + ', Value : ' + data[key])
        });

        wallets[this.props.user].skill = data;
        this.loadWallet();
        this.setState({loaded:true});
        //console.log(data.android);
      })
      */
      }
      //Object.keys(data).forEach(function(key){console.log(key)}))}


render(){
  var backLink;
  var skillList;

  if(this.props.store.user){
    backLink = "/"+this.props.store.user;
  }else{
    backLink = "/";
  }

  if(this.state.loaded){
    skillList = displaySkill(this.props.user);
  }else{
    skillList = <SmallText>Loading skills from blockchain....</SmallText>
  }

  return(
    <MainDiv>
    <StyledProfile>
    <Avator src={keys[this.props.user].img}/>
    <BigText>{keys[this.props.user].fullName}</BigText>
    <SmallText>
    <AccountLink href={'https://horizon-testnet.stellar.org/accounts/'+keys[this.props.user].publicKey} target='_blank'> Address: {keys[this.props.user].publicKey}
    </AccountLink>
    </SmallText>
    <MidText> Sparrow Coin :  {this.state.fund}</MidText>
     <SkillList>
     {skillList}
    </SkillList>

    </StyledProfile>
    <StyledLink to={backLink}>Back</StyledLink>

     </MainDiv>
  )
}


}

export default ShowFriend;
