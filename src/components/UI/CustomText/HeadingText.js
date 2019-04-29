import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default (props) =>
  <Text style={[styles.textHeading, props.style]} {...props}>{props.children}</Text>

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 28,
    fontWeight: "bold"
  }
});