import './Slider.css';
import { Carousel } from 'antd';
import './Slider.css';

const contentStyle = {
   // margin: 0,
   // height: '160px',
   // color: '#fff',
   // lineHeight: '160px',
   // textAlign: 'center',
   // background: '#364d79',
};

export const Slider = () => {
   const onChange = (currentSlide) => {
      console.log(currentSlide);
   };

   return (
      // autoplay='true' autoplaySpeed={3000}
      <Carousel className='carousel' afterChange={onChange}>
         <div className='carousel__item'>
            <h3>1</h3>
         </div>
         <div className='carousel__item'>
            <h3>2</h3>
         </div>
         <div className='carousel__item'>
            <h3>3</h3>
         </div>
         <div className='carousel__item'>
            <h3>4</h3>
         </div>
      </Carousel>
   );
};
