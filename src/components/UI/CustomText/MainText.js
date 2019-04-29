import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default ({ style, children }) => (
  <Text style={[styles.mainText, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  mainText: {
    color: "black",
    backgroundColor: "transparent"
  }
});