import React from 'react';
import './dots.scss';

export const Dots = ({    
    sliderArr,
    state,
    handleClick    
}) => {   
  
    return (
        <div className='dots-cont'>
            {
                sliderArr.map((item, index) => {
                    return (
                        <div
                            onClick={handleClick.bind(null, index+1)}
                            key={index}
                            id={index + 1}
                            className={state[index+1] ? 'dot-item active' : 'dot-item'}
                        ></div>
                    )
                })
           }           
        </div>
    )
}