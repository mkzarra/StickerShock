import React, { Component } from 'react';
import { View, Button, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { addImage } from '../../store/actions/index';
import DefautInput from '../../components/UI/CustomInput/DefaultInput';
import PickImage from '../../components/PickImage/PickImage';
import MainText from '../../components/UI/CustomText/MainText';
import HeadingText from '../../components/UI/CustomText/HeadingText';
import validate from '../../utilities/validation';

class ShareImageScreen extends Component {
  state = {
    controls: {
      title: {
        value: '',
        valid: true,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      image: {
        value: null,
        valid: false
      }
    }
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavergatorEvent);
  }

  onNavergatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({ side: 'left' });
      }
    }
  }

  titleChangedHandler = (value) => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        title: {
          ...prevState.controls.title,
          value,
          valid: validate(value, prevState.controls.title.validationRules),
          touched: true
        }
      }
    }));
  }

  imagePickedHandler = (value) => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        image: { value, valid: true }
      }
    }));
  }

  imageAddedHandler = () => {
    const { title, image } = this.state.controls;
    this.props.onAddImage(title.value, image.value);
  }

  render() {
    const { title, image } = this.state.controls
    let submitButton = (
      <Button
        title="Upload Image"
        onPress={this.imageAddedHandler}
        disabled={!title.valid || !image.valid}
      />
    );

    if (this.props.loading) {
      submitButton = <ActivityIndicator />
    }
    return (
     <ScrollView>
       <View style={styles.container}>
        <MainText>
          <HeadingText>Upload an Image</HeadingText>
        </MainText>
        <PickImage onImagePicked={this.imagePickedHandler} />
        <DefautInput title={title} onChangeText={this.titleChangedHandler} />
        <View style={styles.button}>
          {submitButton}
        </View>
       </View>
     </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeHolder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

const mapStateToProps = ({ ui }) => ({
  loading: ui.loading
});

const mapDispatchToProps = dispatch => ({
  onAddImage: (title, image) => dispatch(addImage(title, image))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareImageScreen);