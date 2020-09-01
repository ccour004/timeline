import React from 'react';
import ChartistGraph from 'react-chartist';
import { Button } from '@material-ui/core';
import ApiCalendar from 'react-google-calendar-api';
import './App.css';

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
    this.state = {isSigned:false};
    ApiCalendar.onLoad(() => {
      console.log("Calendar API loaded...")
      ApiCalendar.listenSign((isSigned)=>{console.log("LISTEN SIGNED! "+isSigned);this.setState({isSigned})});
    });
  }

  render(){
    return this.state.isSigned ? 
      <div>
      <Button color="primary" onClick={()=>ApiCalendar.handleSignoutClick()}>Sign out</Button>
      <Bar/> 
      </div>
    : <Button color="primary" onClick={()=>ApiCalendar.handleAuthClick()}>Sign in</Button>
  }
}

export default App;
