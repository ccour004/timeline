import {useState, useEffect} from 'react';

export default function useFetch(input){
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [fetching,setFetching] = useState(true);

    useEffect(()=>{
        const interval = setInterval(() => {
        if(!input.pause || input.pause === false)
          fetch(input.query,input.options?input.options:{})
            .then(response=>response.json())
            .then(response=>{
                setData(response);
                setFetching(false);
            })
            .catch(inError => setError(inError))
        }, input.timer?input.timer:10000);
        return () => clearInterval(interval);
      },[input.query,input.options,input.timer,input.pause]);
    
    return [data, fetching, error]
}