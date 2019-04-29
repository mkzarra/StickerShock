import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import ImageList from '../../components/ImageList/ImageList';
import { getImages } from '../../store/actions/index';

class FindImageScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  state = {
    imagesLoaded: false,
    removeAnimation: new Animated.Value(1),
    imagesAnimation: new Animated.Value(0)
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  componentDidMount() {
    this.props.onLoadImages();
  }

  onNavigatorEvent = (event) => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({ side: "left" });
      }
    }
  }

  imagesLoadedHandler = () => {
    Animated.timing(this.state.imagesAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  imagesSearchHandler = () => {
    Animated.timing(this.state.removeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({ imagesLoaded: true });
      this.imagesLoadedHandler();
    });
  }

  itemSelectedHandler = (imageKey) => {
    const selectedImage = this.props.images.find(({ key }) => key === imageKey);
    this.props.navigator.push({
      screen: "StickerShock.ImageDetailScreen",
      title: selectedImage.title,
      passProps: { selectedImage }
    });
  }

  render() {
    let content = (
      <Animated.View style={{
        opacity: this.state.removeAnimation,
        transform: [
          {
            scale: this.state.removeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 1]
            })
          }
        ]
      }}
      >
        <TouchableOpacity onPress={this.imagesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Photos</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.imagesLoaded) {
      content = (
        <Animated.View style={{ opacity: this.state.imagesAnimation }}>
          <ImageList images={this.props.images} onItemSelected={this.itemSelectedHandler} />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.imagesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  }
});

const mapStateToProps = ({ images }) => ({
  images: images.images
});

const mapDispatchToProps = dispatch => ({
  onLoadImages: () => dispatch(getImages())
});

export default connect(mapStateToProps, mapDispatchToProps)(FindImageScreen);
