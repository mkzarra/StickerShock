import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default ({ imageTitle, onItemPressed, imagePhoto }) => (
  <TouchableOpacity onPress={onItemPressed}>
    <View style={styles.listItem}>
      <Image resizeMode="cover" source={imagePhoto} style={styles.imagePhoto} />
      <Text>{imageTitle}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  imagePhoto: {
    marginRight: 8,
    height: 80,
    width: 80
  }
});