import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

function ListItem({title, subTitle, image}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.hours}>{subTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
    marginRight: 12,
  },
  name: {
    fontSize: 15,
    marginBottom: 3,
    marginTop: 5,
    fontWeight: '600',
  },
  hours: {
    fontSize: 10,
  },
});

export default ListItem;
