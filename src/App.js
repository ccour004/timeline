import React from 'react';
import { VictoryChart,VictoryArea,VictoryTheme } from "victory";
import './App.css';

function App() {
  return (
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
  );
}

export default App;
