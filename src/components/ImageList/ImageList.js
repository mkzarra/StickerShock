import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem'

export default ({ onItemSelected, images }) => (
  <FlatList
    style={styles.listContainer}
    data={images}
    renderItem={({ item }) => (
      <ListItem
        imageTitle={item.title}
        imagePhoto={item.image}
        onItemPressed={() => onItemSelected(item.key)}
      />
    )}
  />
);

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});
