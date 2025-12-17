import './ButtonList.css';
import Button from './Button';

const ButtonList = ({ items = [] }) => {
  return (
    <div className="ButtonList">
      {items.map(({ label, onClick, type }, idx) => (
        <Button
          key={`${label}-${idx}`}
          text={label}
          onClick={onClick}
          type={type || 'Plain'}
        />
      ))}
    </div>
  );
};

export default ButtonList;