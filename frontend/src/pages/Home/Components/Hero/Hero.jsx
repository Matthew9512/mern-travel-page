import { FontAwesome } from '../../../../utils/icons';
import './Hero.css';

export const Hero = () => {
   return (
      <section className='hero'>
         <video className='hero__video' src='/hero4.mp4' muted loop></video>
         <h1 className='hero__header'>
            Explore the <br />
            <span>
               W
               <span className='hero__logo'>
                  <FontAwesome iconName='earth-americas' classType='hero__logo' />
               </span>
               rld
            </span>
         </h1>
      </section>
   );
};
