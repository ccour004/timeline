import React from 'react';
import ChartistGraph from 'react-chartist';
import { GoogleLogout,GoogleLogin } from 'react-google-login';
import './App.css';
import { Button } from '@material-ui/core';

class Bar extends React.Component {
  render() {
 
    var data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
      ]
    };
 
    var options = {
      high: 10,
      low: -10,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };
 
    var type = 'Line'
 
    return (
      <div>
        <ChartistGraph data={data} options={options} type={type} />
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {isSigned:false,access_token:'',url:'https://www.googleapis.com/calendar/v3/',CALENDAR_LIST:'users/me/calendarList',items:[]};
  }

  apiCall(API_CALL,params,callback){
    fetch(this.state.url+API_CALL+"?key="+process.env.REACT_APP_API_KEY+"&"+params,{
        headers:{'Authorization':"Bearer "+this.state.access_token,'Accept':'application/json'}
    }).then(response=>response.json()).then(response=>{callback(response)})
  }

  render(){
    return this.state.isSigned?<div><GoogleLogout
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={()=>this.setState({isSigned:false,access_token:''})}/>
    <Button onClick={()=>this.apiCall(this.state.CALENDAR_LIST,"",(response)=>{console.log(JSON.stringify(response))})}>Calendar List</Button>
    <Button onClick={()=>this.apiCall('calendars/primary/events','timeMin=2020-02-02T10:00:00-07:00',(response)=>{
      this.setState({items:response.items})
      response.items.forEach((event)=>{
        console.log("SUMMARY: "+event.summary+",START: "+(event.start?(event.start.date?event.start.date:event.start.dateTime):""))
      })
      })}>Event List</Button>
    <Bar/>
    {this.state.items.map((event)=>{
      if(event.summary === undefined) return (null)
      return <div>SUMMARY: {event.summary},START: {(event.start?(event.start.date?event.start.date:event.start.dateTime):"")}</div>
    })}
    </div>
    :<GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Login"
      scope="https://www.googleapis.com/auth/calendar"
      onSuccess={(response)=>{this.setState({access_token:response.wc.access_token,isSigned:true})}}
      onFailure={()=>alert("Login failed!")}
      cookiePolicy={'single_host_origin'}
  />
  }
}

export default App;
