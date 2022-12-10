import '../App.css';
import React, {useState} from 'react';
import {Control} from './Control.jsx';
import {Canvas} from './Canvas.jsx';
import {Reset} from './Reset.jsx';

export function Display() {
    const FullHdW = 26;
    const StretchedW = 27;
    const MaxW = StretchedW > FullHdW ? StretchedW : FullHdW;
    const MaxH = 13;
    const defaultH = 7;
    const defaultW = FullHdW;
    const [W, setW] = useState(defaultW);
    const [H, setH] = useState(defaultH);

    const template = () => {
        const tmp = new Array(MaxH);
        for (let i = 0; i < MaxH; i++) {
            tmp[i] = new Array(MaxW);
            for (let j = 0; j < MaxW; j++) {
                tmp[i][j] = 0;
            }
        }
        return tmp;
    };

    const [data, setData] = useState(template());

    const changeResolution = (e) => {
        if (e.target.value === "FullHD") {
            setW(FullHdW);
        } else if (e.target.value === "stretched") {
            setW(StretchedW);
        }
    }

    const incrementH = () => {
        if (H < MaxH) {
            setH(prevH => prevH + 1);
        }
    }
    const decrementH = () => {
        if (H > 1) {
            setH(prevH => prevH - 1);
        }
    }

    const createText = () => {
        const grayChar = "░";
        const whiteChar = "█";
        let content = "";
        for (let i = 0; i < H; i++) {
            for (let j = 0; j < W; j++) {
                content += (data[i][j] === 0 ? grayChar : whiteChar);
            }
        }
        return content;
    }

    const copy2Clipboard = () => {
        const text = createText();
        navigator.clipboard.writeText(text);
    }

    const downloadText = () => {
        const text = createText();
        const element = document.createElement("a");
        const file = new Blob([text], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "VALORANT-Oekaki-Chat_export.txt";
        document.body.appendChild(element);
        element.click();
    }

    const resetData = () => {
        setData(template());
    }

    return (
        <>
            <Control
                incrementH={incrementH}
                decrementH={decrementH}
                changeResolution={changeResolution}
                currentH={H}
                copy2Clipboard={copy2Clipboard}
                downloadText={downloadText}
            />
            <Canvas
                data={data}
                setData={setData}
                MaxW={MaxW}
                MaxH={MaxH}
                W={W}
                H={H}
            />
            <Reset
                resetData={resetData}
            />
        </>
    );
}
