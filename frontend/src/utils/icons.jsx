import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
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
   faAngleLeft,
   faAngleRight,
   faUserMinus,
} from '@fortawesome/free-solid-svg-icons';

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
   faThumbsUp,
   faAngleLeft,
   faAngleRight,
   faUserMinus
);

export const FontAwesome = ({ iconName, classType = '' }) => {
   return <FontAwesomeIcon icon={`${iconName}`} className={`${classType}`} />;
};
