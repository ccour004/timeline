import React,{useState} from 'react';
import ChartistGraph from 'react-chartist';

export default function Graph(props){
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