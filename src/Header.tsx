
//import Slider from 'react-slick';
import './Header.css';

const Header = () => {
  return (
    <div>
      {/*}
      <Slider {...settings}>
        <div>Slide 1</div>
      </Slider>
      {*/}
      <h1 className="header">Header Text</h1>
      <table className="header-table">
          <tr className='height-40'><td></td></tr>
          <tr className='height-10'><td></td></tr>
      </table>
    </div>
  );  
};

export default Header;