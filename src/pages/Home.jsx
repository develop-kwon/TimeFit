import Header from "../components/Header";
import Button from '../components/Button';
import Logo from '../assets/TimeFit_Logo.png';
import ButtonList from '../components/ButtonList.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const nav = useNavigate();
  const navItems = [
    { label: '홈', onClick: () => nav('/'), type: 'Plain' },
    { label: '태스크 보드', onClick: () => nav('/tasks'), type: 'Plain' },
    { label: '일자리 찾기', onClick: () => nav('/find'), type: 'Plain' },
  ];

  return (
    <div>
      <Header
        centerChild={<ButtonList items={navItems} />}
        leftChild={
          <Button
            text={'TimeFit'}
            icon={<img src={Logo} width={60} />}
            onClick={() => nav('/')}
            type={'Logo'}
          />
        }
        rightChild={
          <Button text={'로그인'} type={'Login'} onClick={() => nav('/login')} />
        }
      />
    </div>
  );
};

export default Home;