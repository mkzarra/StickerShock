import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './src/store/configStore';

import LandingScreen from './src/screens/Landing/Landing';
import EditImageScreen from './src/screens/EditImage/EditImage';
import FindImageScreen from './src/screens/FindImage/FindImage';
import ImageDetailScreen from './src/screens/ImageDetail/ImageDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import ShareImageScreen from './src/screens/ShareImage/ShareImage';

const store = configureStore();

// Register Screens
Navigation.registerComponent(
  "StickerShock.LandingScreen",
  () => LandingScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "StickerShock.ShareImageScreen",
  () => ShareImageScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "StickerShock.EditImageScreen",
  () => EditImageScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "StickerShock.FindImageScreen",
  () => FindImageScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "StickerShock.ImageDetailScreen",
  () => ImageDetailScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "StickerShock.SideDrawer",
  () => SideDrawer
);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: "StickerShock.LandingScreen",
    title: "StickerShock"
  }
});