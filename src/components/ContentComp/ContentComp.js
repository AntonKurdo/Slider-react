import React from 'react';

export const ContentCopm = ({ src }) => {    
    return (
        <img  
            draggable={false}    
            src={src}
            style={{ width: '100%', objectFit: 'content' }}
            className='content' alt='slide-img'             
        />
    )
}