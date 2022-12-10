import '../App.css';

export function Control(props) {
    return (
        <div className="buttons">
            <div className="selection">
                <p>
                    Resolution mode
                </p>
                <select onChange={props.changeResolution}>
                    <option value="FullHD">
                        Full HD
                    </option>
                    <option value="stretched">
                        4:3
                    </option>
                </select>
            </div>
            <div className="control">
                <p>
                    Change height (DEFAULT 7 MAX 13)
                </p>
                <button className="actionClicked" onClick={props.decrementH}>
                    -1
                </button>
                <button className="actionClicked" onClick={props.incrementH}>
                    +1
                </button>
            </div>
            <div>
                <p>
                    Current height : {props.currentH}
                </p>
            </div>
            <div className="export">
                <button className="actionClicked" onClick={props.copy2Clipboard}>
                    Copy
                </button>
                <button className="actionClicked" onClick={props.downloadText}>
                    Download as a text file
                </button>
            </div>
        </div>
    );
}
