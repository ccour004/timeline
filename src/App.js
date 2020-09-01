import React from 'react';
import ChartistGraph from 'react-chartist';
import { GoogleLogout,GoogleLogin } from 'react-google-login';
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

  }

  render(){
    return this.state.isSigned?<div><GoogleLogout
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Logout"
    onLogoutSuccess={()=>this.setState({isSigned:false})}/>
    <Bar/>
    </div>
    :<GoogleLogin
    clientId={process.env.REACT_APP_CLIENT_ID}
    buttonText="Login"
    onSuccess={()=>this.setState({isSigned:true})}
    onFailure={()=>alert("Login failed!")}
    cookiePolicy={'single_host_origin'}
  />
  }
}

export default App;
