import './Footer.css';
import Icon from '../assets/TimeFit_Logo.png'
import { Link } from 'react-router-dom';
import Siheung from '../assets/Siheung-img.svg'
import Tuk from '../assets/tuk-logo.png'
import Character from '../assets/haero_toro-image.webp'

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="web">
                <div className="brand">
                    <img src={Icon} width={60} />
                    <div className="title">TimeFit</div>
                </div>

                <div className="description">
                    시흥시 지역 기반 스케줄 매칭 플랫폼
                </div>
            </div>

            <div className="service">
                서비스
                <Link to="/find" className="service-link">일자리 찾기</Link>
                <Link to="/tasks" className="service-link">서비스 소개</Link>
            </div>

            <div className='client'>
                고객지원
                <div>이용약관</div>
                <div>개인정보처리방침</div>
                <div>고객센터</div>
            </div>

            <div className='request'>
                문의
                <div>email: info@example.com</div>
                <div>전화: 031-123-4567</div>
                <div>주소: 경기도 시흥시 산기대학로</div>
            </div>
            <div className='info'>
                <div className='images'>
                    <img src={Tuk} width={145.95} />
                    <img src={Siheung} width={88.29} />
                    <img src={Character} width={67.97} />            
                </div>
                <div className='text'>
                    <p>경기도 시흥시 산기대학로 237 (정왕동)</p>
                    <p className='brand'>TimeFit</p>
                    <p className='copy_right'>© 2025 TimeFit. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;