import React from 'react';
import ChartistGraph from 'react-chartist';
import { GoogleLogout,GoogleLogin } from 'react-google-login';
import './App.css';

class Bar extends React.Component {
  constructor(props){
    super(props);
    this.state={low:-10,high:10}
  }
  render() {
 
    var data = {
      labels: this.props.items.map((item)=>{return item.summary}),
      series: [this.props.items.map(()=>{let myNum = Math.random() * 100 - 50; if(myNum < this.state.low) this.setState({low:myNum}); if(myNum > this.state.high) this.setState({high:myNum}); return myNum})]
    };
 
    var options = {
      high: this.state.high,
      low: this.state.low,
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
      onLogoutSuccess={()=>this.setState({isSigned:false,access_token:''},clearInterval(this.state.interval))}/>
    <Bar items={this.state.items}/>
    {this.state.items.map((event)=>{
      if(event.summary === undefined) return (null)
      return <div key={event.summary+"_"+Math.random()}>SUMMARY: {event.summary},START: {(event.start?(event.start.date?event.start.date:event.start.dateTime):"")}</div>
    })}
    </div>
    :<GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Login"
      scope="https://www.googleapis.com/auth/calendar"
      onSuccess={(response)=>{this.setState({access_token:response.wc.access_token,isSigned:true,interval:setInterval(()=>this.apiCall('calendars/primary/events','timeMin=2020-02-02T10:00:00-07:00',(response)=>{
        this.setState({items:response.items !== undefined?response.items:[]},console.log("Calendar updated!"))
        }),10000)})}}
      onFailure={()=>alert("Login failed!")}
      cookiePolicy={'single_host_origin'}
  />
  }
}

export default App;
