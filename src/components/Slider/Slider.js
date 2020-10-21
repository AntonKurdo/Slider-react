import React, {useRef, useEffect, useState} from 'react';
import './slider.scss';
import { ContentCopm } from '../ContentComp/ContentComp';
import { Dots } from '../Dots/Dots';
import { data } from '../../data/data';
import { useKey } from '../../customHooks/useKeyHook';

const dotsStateObj = Object.fromEntries(data.map(n => [n, false]));
dotsStateObj[1] = true;

export const Slider = () => {

       /// ----- CONTROLS ----- ///

    const [dots, setDots] = useState(dotsStateObj);
    const [currentDot, setCurrentDot] = useState(1);
    const [offSet, setOffSet] = useState(0);  

    const moveToSelectedSlide = (id) => {          
        setDots({ ...dotsStateObj, 1: false, [id]: true });
        setCurrentDot(id);
        setOffSet((id -1)* -100);    
    }
        
    const goLeft = () => {           
        offSet === 0
            ? setOffSet(-100 * (data.length - 1))
            : setOffSet(offSet + 100);        
        if (offSet === 0) {
            setCurrentDot(data.length) 
            prevDot(data.length + 1);
        } else {
            setCurrentDot(currentDot- 1);
            prevDot(currentDot);
        }         
    }

    useKey('ArrowLeft', () => {
            offSet === 0
            ? setOffSet(-100 * (data.length - 1))
            : setOffSet(offSet + 100);        
        if (offSet === 0) {
            setCurrentDot(data.length) 
            prevDot(data.length + 1);
        } else {
            setCurrentDot(currentDot- 1);
            prevDot(currentDot);
        }  
    })
 

    const goRight = () => {          
        offSet === -100 * (data.length - 1)
            ? setOffSet(0)
            : setOffSet(offSet - 100)               
        if (offSet === -100 * (data.length - 1)) {
            setCurrentDot(1)
            nextDot(0); 
        } else {
            setCurrentDot(currentDot + 1);
            nextDot(currentDot)
        }     
    }

    useKey('ArrowRight', () => {
        offSet === -100 * (data.length - 1)
            ? setOffSet(0)
            : setOffSet(offSet - 100)               
        if (offSet === -100 * (data.length - 1)) {
            setCurrentDot(1)
            nextDot(0); 
        } else {
            setCurrentDot(currentDot + 1);
            nextDot(currentDot)
        }  
    })

    const nextDot = (num) => {        
        setDots({...dotsStateObj, 1: false,  [num+1]: true});
    }

    const prevDot = (num) => {        
        setDots({...dotsStateObj, 1: false,  [num-1]: true});
    }

    /////////////////////////////////////////////
    
    /// ----- SWIPES ----- ///

    let isSwiping = false;
    let startOffSet = null;
    const slide = useRef(null);
    let basicPos = offSet;
    let diff = null;
   
    const swipeStart = (e) => {
        if (e.target.className === 'content') {
            startOffSet = e.pageX;
            isSwiping = true;  
            basicPos = offSet;
        }                       
    }

    const swipeMove = e => {
        if (isSwiping) {
            if (e.target.className === 'content') {
                let transformMatrix = 0;
                diff = Math.round((e.pageX - startOffSet) / window.innerWidth * 100);
                if ((diff < 0 && offSet === (data.length - 1) * -100) || (diff > 0 && offSet === 0)) {               
                    diff = null;
                } else {                   
                    if (slide.current) {
                        transformMatrix = window.getComputedStyle(slide.current).transform.split(',')[4].trim() / window.innerWidth * 100;                            
                    }
                    setOffSet(Math.round(transformMatrix + diff));             
                }                         
            }              
        }           
    }

    const swipeEnd = (e) => {
        if (e.target.className === 'content') {
            isSwiping = false;
            if (diff && diff < 0 && offSet !== (data.length - 1) * -100) {
                setOffSet(basicPos - 100);               
                setCurrentDot(currentDot + 1);
                nextDot(currentDot)
            }
            if (diff && diff > 0 && offSet !== 0) {
                setOffSet(basicPos + 100)
                setCurrentDot(currentDot - 1);
                prevDot(currentDot)
            }       
        }            
    }
  
    useEffect(() => {
        if (window.PointerEvent) {
            window.addEventListener('pointerdown', swipeStart);    
            window.addEventListener('pointermove', swipeMove);
            window.addEventListener('pointerup', swipeEnd);

            return () =>   window.removeEventListener('pointerdown', swipeStart);  
        } else {
            window.addEventListener('mousedown', swipeStart);    
            window.addEventListener('mousemove', swipeMove);
            window.addEventListener('mouseup', swipeEnd);

            window.addEventListener('touchdown', swipeStart);    
            window.addEventListener('touchmove', swipeMove);
            window.addEventListener('touchup', swipeEnd);

            return () => {
                window.removeEventListener('mousedown', swipeStart);     
                window.removeEventListener('touchdown', swipeStart);    
            }
        }     
    })
   
    /////////////////////////////////////////////
    
    return (
        <>
            <div className='slider'>
                    {data.map((item, index) => {
                        return (
                            <div
                                ref={slide}
                                key={index}
                                className='slide'                        
                                style={{ transform: `translateX(${offSet}%)` }}
                            >
                                <ContentCopm     
                                    src={item} />
                            </div>
                        )
                    })}
                <button id='goLeft' onClick={goLeft}> &lt; </button>
                <button id='goRight' onClick={goRight}> &gt; </button>
            </div>
            <Dots 
                data={data}
                dots={dots}
                moveToSelectedSlide={moveToSelectedSlide} 
            />
        </>
    )
}