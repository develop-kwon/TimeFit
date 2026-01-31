import './ButtonList.css';
import Button from './Button';

const ButtonList = ({ items = [] }) => {
  return (
    <div className="ButtonList">
      {items.map(({ label, onClick, type, active }, idx) => (
        <Button
          key={`${label}-${idx}`}
          text={label}
          onClick={onClick}
          type={type || 'Plain'}
          active={active}
        />
      ))}
    </div>
  );
};

export default ButtonList;