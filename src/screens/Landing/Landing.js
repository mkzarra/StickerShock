import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import startMainTabs from '../MainTabs/startMainTabs';
import HeadingText from '../../components/UI/CustomText/HeadingText';
import MainText from '../../components/UI/CustomText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import { getStarted } from '../../store/actions/index';

class LandingScreen extends Component {
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

  enterAppHandler = () => {
    this.props.onGetStarted();
    startMainTabs();
  }

  render() {
    return (
      <View style={styles.container}>
      <MainText>
        <HeadingText>
          Weclome to StickerShock!
        </HeadingText>
      </MainText>
      <ButtonWithBackground color="#19a7f4" onPress={this.enterAppHandler}>Get Started</ButtonWithBackground>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => ({
  onGetStarted: () => dispatch(getStarted())
});

export default connect(null, mapDispatchToProps)(LandingScreen);