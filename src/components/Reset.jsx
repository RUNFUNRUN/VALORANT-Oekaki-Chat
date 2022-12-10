import '../App.css';

export function Reset(props) {
    return (
        <div className='buttons'>
            <button className='actionClicked reset' onClick={props.resetData}>Reset</button>
        </div>
    );
}
