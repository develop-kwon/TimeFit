import './Header.css';

const Header = ({centerChild, leftChild, rightChild}) => {
    return (
        <header className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_center">{centerChild}</div>
            <div className="header_right">{rightChild}</div>
        </header>
    );
}

export default Header;