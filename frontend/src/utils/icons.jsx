import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCheck,
   faCircleNotch,
   faEarthAmericas,
   faLocationDot,
   faMagnifyingGlass,
   faPenToSquare,
   faPlane,
   faThumbsDown,
   faThumbsUp,
   faTrash,
   faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(
   faGithub,
   faLinkedin,
   faEarthAmericas,
   faCircleNotch,
   faPlane,
   faLocationDot,
   faMagnifyingGlass,
   faUser,
   faCheck,
   faTrash,
   faPenToSquare,
   faThumbsDown,
   faThumbsUp
);

// export const FontAwesome = (iconName) => {
//    return <FontAwesomeIcon icon={iconName} />;
// };

export const FontAwesome = ({ iconName, action }) => {
   //    console.log(iconName);
   //    const iconName = 'plane';
   //    if (!iconName) return;
   return <FontAwesomeIcon icon={`${iconName}`} />;
};

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
