import React from 'react';
import './dots.scss';

export const Dots = ({    
    data,
    dots,
    moveToSelectedSlide    
}) => {   
  
    return (
        <div className='dots-cont'>
            {
                data.map((item, index) => {
                    return (
                        <div
                            onClick={moveToSelectedSlide.bind(null, index+1)}
                            key={index}
                            id={index + 1}
                            className={dots[index+1] ? 'dot-item active' : 'dot-item'}
                        ></div>
                    )
                })
           }           
        </div>
    )
}