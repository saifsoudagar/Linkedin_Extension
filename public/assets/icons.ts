// Import the SVG icons
import aiIcon from './ai-icon.svg';
import PlaneIcon from './PlaneIcon.svg';
import InertIcon from './InertIcon.svg';
import RegenrateIcon from './RegenrateIcon.svg';

// Define an interface for the icons if you want to be more explicit
export type IconType = {
  aiIcon: string;
  PlaneIcon: string;
  InertIcon: string;
  RegenrateIcon: string;
};

// Create an object to hold the icons
const icons: Record<string, string> = {
  aiIcon,
  PlaneIcon,
  InertIcon,
  RegenrateIcon,
};

// Export the icons object
export default icons;
