import './Button.css';

const Button = ({ text, type, onClick, icon, active }) => {
    return (
        <button
            onClick={onClick}
            className={`Button Button_${type}${active ? ' active' : ''}`}>
            <div className='icon'>{icon}</div>
            <div className='gradient'>{text}</div>
        </button>
    );
};

export default Button;