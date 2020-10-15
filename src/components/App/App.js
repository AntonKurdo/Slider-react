import React, { useState } from 'react';
import { Slider } from '../Slider/Slider';
import { Dots } from '../Dots/Dots';
import { sliderArr } from '../../data/data';

const stateObj = Object.fromEntries(sliderArr.map(n => [n, false]));
stateObj[1] = true;

const App = () => { 
  const [state, setState] = useState(stateObj);
  const [currentControl, setCurrentControl] = useState(1);
  const [x, setX] = useState(0);  

  const handleClick = (id) => {          
    setState({ ...stateObj, 1: false, [id]: true });
    setCurrentControl(id);
    setX((id -1)* -100);    
  }

  const nextDot = (num) => {        
    setState({...stateObj, 1: false,  [num+1]: true});
  }
  const prevDot = (num) => {        
    setState({...stateObj, 1: false,  [num-1]: true});
  }
  
  return (
    <div className="App" >     
      <Slider
        sliderArr={sliderArr}
        nextDot={nextDot}
        prevDot={prevDot}
        state={currentControl}
        setState={setCurrentControl}
        x={x}
        setX={setX}
        />
      <Dots
        sliderArr={sliderArr}
        state={state}
        handleClick={handleClick}       
        />
    </div>
  );
}

export default App;
