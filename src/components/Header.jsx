import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import {BsFillMoonStarsFill, BsFillSunFill} from 'react-icons/bs'


export function Header() {
    const [modoOscuro, setModoOscuro] = useState(false);

    useEffect(() => {
        if (modoOscuro) document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
        
    }, [modoOscuro]);

    const toggleModo = () => {
        setModoOscuro(!modoOscuro);
    };

    return (
        <div>
            <h1>VALORANT Oekaki Chat</h1>
            <Toggle
                defaultChecked={modoOscuro}
                onChange={toggleModo}
                icons={{checked: <BsFillMoonStarsFill style={{ color: 'yellow', width: '15px', position:'fixed', top:'0',marginTop: '51px'  }}/>, unchecked: <BsFillSunFill  style={{ color: 'yellow', width: '15px', position:'fixed', top:'0',marginTop: '51px' }}/>}}
                className='header-toggle'
            />
        </div>
    );
}



