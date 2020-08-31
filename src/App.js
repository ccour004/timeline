import React from 'react';
import { VictoryChart,VictoryArea,VictoryTheme } from "victory";
import { Button } from '@material-ui/core';
import ApiCalendar from 'react-google-calendar-api';
import './App.css';

function App() {
  return (
    <div>
    <Button color="primary" onClick={()=>ApiCalendar.handleAuthClick()}>Sign in</Button>
    <Button color="primary" onClick={()=>ApiCalendar.handleSignoutClick()}>Sign out</Button>
    <VictoryChart
    theme={VictoryTheme.material}
    >
      <VictoryArea
        style={{ data: { fill: "#c43a31" } }}
        data={[
          { x: 1, y: -2},
          { x: 2, y: 3},
          { x: 3, y: 5},
          { x: 4, y: 4},
          { x: 5, y: 6}
        ]}
      />
    </VictoryChart>
    </div>
  );
}

export default App;
