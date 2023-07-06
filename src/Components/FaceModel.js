import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../utils/COLORS';

function FaceModel(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.aquamarine,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cam: {
    width: 120,
    height: 130,
    backgroundColor: 'transparent',
  },
});

export default FaceModel;
