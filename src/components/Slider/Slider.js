import React, {useRef, useEffect} from 'react';
import './slider.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ContentCopm } from '../ContentComp/ContentComp';

export const Slider = ({
    sliderArr,
    nextDot,
    prevDot,
    state,
    setState,
    x,
    setX
}) => {
    const goLeft = () => {           
        x === 0
            ? setX(-100 * (sliderArr.length - 1))
            : setX(x + 100);        
        if (x === 0) {
            setState(sliderArr.length) 
            prevDot(sliderArr.length + 1);
        } else {
            setState(state - 1);
            prevDot(state);
        }         
    }

    const goRight = () => {          
        x === -100 * (sliderArr.length - 1)
            ? setX(0)
            : setX(x - 100)               
        if (x === -100 * (sliderArr.length - 1)) {
            setState(1)
            nextDot(0); 
        } else {
            setState(state + 1);
            nextDot(state)
        }     
    }
    
//////////////////////////////////////

    let isSwiping = false;
    let startX = null;
    const slide = useRef(null);
    let basicPos = x;
    let diff = null;
   
    const swipeStart = (e) => {
        if (e.target.className === 'content') {
            startX = e.pageX;
            isSwiping = true;  
            basicPos = x;
        }                       
    }

    const swipeMove = e => {
        if (isSwiping) {
            if (e.target.className === 'content') {
                let transformMatrix = 0;
                diff = Math.round((e.pageX - startX) / window.innerWidth * 100);
                if (diff > 0 && x === 0) {
                    // console.log('diff > 0')
                    console.log(x)
                    diff = null;
                } else {
                   
                    if (slide.current) {
                        transformMatrix = window.getComputedStyle(slide.current).transform.split(',')[4].trim() / window.innerWidth * 100;                        
                    }
                     setX(Math.round(transformMatrix + diff));   
                }
                          
            }              
        }           
    }

    const swipeEnd = (e) => {
        if (e.target.className === 'content') {
            isSwiping = false;
            if (diff && diff < 0) {
                setX(basicPos - 100);               
                setState(state + 1);
                nextDot(state)
            }
            if (diff && diff > 0 && x !== 0) {
                setX(basicPos + 100)
                setState(state - 1);
                prevDot(state)
            }       
        }            
    }
  

    useEffect(() => {
        if (window.PointerEvent) {
            window.addEventListener('pointerdown', swipeStart);    
            window.addEventListener('pointermove', swipeMove);
            window.addEventListener('pointerup', swipeEnd);
        } else {
            window.addEventListener('mousedown', swipeStart);    
            window.addEventListener('mousemove', swipeMove);
            window.addEventListener('mouseup', swipeEnd);
        }
        
        

        // window.addEventListener('touchdown', swipeStart);    
        // window.addEventListener('touchmove', swipeMove);
        // window.addEventListener('touchup', swipeEnd);

        return () => {
            window.removeEventListener('mousedown', swipeStart);     
            window.removeEventListener('pointerdown', swipeStart);  
            // window.removeEventListener('touchdown', swipeStart);    
        }
    })
   
/////////////////////////////////////////////
    
    return (
        <div            
            className='slider'>
            {sliderArr.map((item, index) => {
                return (
                    <div
                        ref={slide}
                        key={index}
                        className='slide'                        
                        style={{
                        transform: `translateX(${x}%)`
                    }}>
                        <ContentCopm                               
                            src={item} />,
                    </div>
                )
            })}
            <button id='goLeft' onClick={goLeft}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <button id='goRight' onClick={goRight}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </button>
        </div>
    )
}