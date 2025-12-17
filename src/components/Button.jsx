import './Button.css';

const Button = ({ text, type, onClick, icon }) => {
    return (
        <button
            onClick={onClick}
            className={`Button Button_${type}`}>
            <div className='icon'>{icon}</div>
            <div className='gradient'>{text}</div>
        </button>
    );
};

export default Button;