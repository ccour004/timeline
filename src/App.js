import React,{useState} from 'react';

import { GoogleLogout,GoogleLogin } from 'react-google-login';
import useFetch from './useFetch.js'
import Graph from './timeline_graph.js'
import './App.css';

export default function App(){
  const [accessToken,setAccessToken] = useState('');
  const [calendar,] = useState('primary');
  const URL = 'https://www.googleapis.com/calendar/v3/';
  //const CALENDAR_LIST = 'users/me/calendarList';

  const [data,fetching,] = useFetch({query:URL+"calendars/"+calendar+"/events?key="+process.env.REACT_APP_API_KEY+"&timeMin=2020-02-02T10:00:00-07:00",
                             pause: accessToken === '',
                             options:{headers:{'Authorization':"Bearer "+accessToken,'Accept':'application/json'}}})

  return accessToken !== ''?<div><GoogleLogout
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={()=>{setAccessToken('')}}/>
  <Graph items={fetching?[]:data.items}/>
  {(fetching?[]:data.items).map((event)=>{
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