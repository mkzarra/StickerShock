import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default () => {
  const platformPrefix = Platform.OS === "android" ? "md-" : "ios-"
  Promise.all([
    Icon.getImageSource(platformPrefix + "map", 30),
    Icon.getImageSource(platformPrefix + "share-alt", 30),
    Icon.getImageSource(platformPrefix + "menu", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [{
          screen: "StickerShock.FindImageScreen",
          label: "Find Image",
          title: "Find Image",
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              { icon: sources[2], title: "Menu", id: "sideDrawerToggle" }
            ]
          }
        },
        {
          screen: "StickerShock.ShareImageScreen",
          label: "Share Image",
          title: "Share Image",
          icon: sources[1],
            navigatorButtons: {
              leftButtons: [
                { icon: sources[2], title: "Menu", id: "sideDrawerToggle" }
              ]
            }
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: "orange"
      },
      drawer: {
        left: {
          screen: "StickerShock.SideDrawer"
        }
      },
      appStyle: {
        tabBarSelectedButtonColor: "orange"
      }
    });
  });
}