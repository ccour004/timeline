import React,{useState, useEffect} from 'react';
import ChartistGraph from 'react-chartist';
import { GoogleLogout,GoogleLogin } from 'react-google-login';
import './App.css';

function Bar(props){
  const [low,setLow] = useState(-10);
  const [high,setHigh] = useState(10);

  var data = {
    labels: props.items.map((item)=>{return item.summary}),
    series: [props.items.map(()=>{let myNum = Math.random() * 100 - 50; if(myNum < low) setLow(myNum); if(myNum > high) setHigh(myNum); return myNum})]
  };
 
  var options = {
    high: high,
    low: low,
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

export default function App(){
  const [accessToken,setAccessToken] = useState('');
  const [items,setItems] = useState([]);
  const URL = 'https://www.googleapis.com/calendar/v3/';
  //const CALENDAR_LIST = 'users/me/calendarList';

  useEffect(()=>{
    if(accessToken === '') return;
    const interval = setInterval(() => {
      fetch(URL+"calendars/primary/events?key="+process.env.REACT_APP_API_KEY+"&timeMin=2020-02-02T10:00:00-07:00",{
        headers:{'Authorization':"Bearer "+accessToken,'Accept':'application/json'}
      }).then(response=>response.json()).then(response=>{
        setItems(response.items !== undefined?response.items:[]);
        console.log("Calendar updated!");
      })
    }, 10000);
    return () => clearInterval(interval);
  },[accessToken]);

  return accessToken !== ''?<div><GoogleLogout
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={()=>{setAccessToken('')}}/>
  <Bar items={items}/>
  {items.map((event)=>{
    if(event.summary === undefined) return (null)
    return <div key={event.summary+"_"+Math.random()}>SUMMARY: {event.summary},START: {(event.start?(event.start.date?event.start.date:event.start.dateTime):"")}</div>
  })}
  </div>
  :<GoogleLogin
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Login"
    scope="https://www.googleapis.com/auth/calendar"
    onSuccess={(response)=>{setAccessToken(response.wc.access_token)}}
    onFailure={()=>alert("Login failed!")}
    cookiePolicy={'single_host_origin'}
  /> 
}