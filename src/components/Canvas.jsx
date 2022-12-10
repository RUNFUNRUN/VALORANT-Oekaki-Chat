import '../App.css';
import React, {useRef, useEffect} from 'react';

export function Canvas(props) {
    const canvasRef = useRef(null);
    const buttonRefs = useRef([]);

    useEffect(() => {
        let count = 0;
        for (let i = 0; i < props.MaxH; i++) {
            for (let j = 0; j < props.MaxW; j++) {
                //create a button
                const button = document.createElement('button');
                button.id = count;
                button.innerText = '';
                if (i < props.H && j < props.W) {
                    button.className = 'pixel active';
                } else {
                    button.className = 'pixel inactive';
                }
                canvasRef.current.appendChild(button);
                //event listener
                buttonRefs.current[count] = button;
                buttonRefs.current[count].addEventListener('click', () => {
                    button.classList.toggle('clicked');
                    props.setData(prevData => {
                        const newData = prevData;
                        newData[i][j] = newData[i][j] === 0 ? 1 : 0;
                        return newData;
                    });
                });
                count++;
            }
            const br = document.createElement('br');
            canvasRef.current.appendChild(br);
        }
    }, []);

    useEffect(() => {
        for (let i = 0; i < props.MaxH; i++) {
            for (let j = 0; j < props.MaxW; j++) {
                const button = buttonRefs.current[i * props.MaxW + j];
                if (i < props.H && j < props.W) {
                    if (button.classList.contains('inactive')) {
                        button.classList.remove('inactive');
                        button.classList.add('active');
                    }
                } else {
                    if (button.classList.contains('active')) {
                        button.classList.remove('active');
                        button.classList.add('inactive');
                    }
                }
            }
        }
    }, [props.H, props.W]);

    useEffect(() => {
        for (let i = 0; i < props.MaxH; i++) {
            for (let j = 0; j < props.MaxW; j++) {
                const button = buttonRefs.current[i * props.MaxW + j];
                if (props.data[i][j] === 1) {
                    if (!button.classList.contains('clicked')) {
                        button.classList.add('clicked');
                    }
                } else {
                    if (button.classList.contains('clicked')) {
                        button.classList.remove('clicked');
                    }
                }
            }
        }
    }, [props.data]);

    return (
        <div className="canvas" ref={canvasRef} />
    );
}
