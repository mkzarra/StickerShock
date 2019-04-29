import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { deleteImage } from '../../store/actions';

class ImageDetail extends Component {
  state = {
    viewMode: "portrait"
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({ viewMode: dims.window.height > 500 ? "portrait" : "landscape" });
  }

  imageDeletedHandler = () => {
    
  }

  render() {
    const { selectedImage } = this.props;
    return (
      <View style={[
        styles.container,
        this.state.viewMode === "portrait"
        ? styles.portraitContainer
        : styles.landscapeContainer
      ]}
      >
        <View style={styles.imageDetailContainer}>
          <View style={styles.subContainer}>
            <Image source={selectedImage.image} style={styles.imagePhoto} />
          </View>
          <View style={styles.subContainer}>
            <View>
              <Text style={styles.imageTitle}>{selectedImage.title}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={this.imageDeletedHandler}>
                <View style={styles.deletButton}>
                  <Icon name={Platform.OS === "android" ? "md-trash" : "ios-trash"} size={30} color="#d73223" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 52
  },
  portraitContainer: {
    flexDirection: "column"
  },
  landscapeContainer: {
    flexDirection: "row"
  },
  imageDetailContainer: {
    flex: 2
  },
  subContainer: {
    flex: 1
  },
  imagePhoto: {
    width: "100%",
    height: "100%"
  },
  imageTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deletButton: {
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => ({ onDeleteImage: (key) => dispatch(deleteImage(key)) });

export default connect(null, mapDispatchToProps)(ImageDetail);