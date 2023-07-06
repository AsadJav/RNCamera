import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

function CountDown({backgroundColor, duration}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.ct}></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  ct: {width: 70, height: 70, backgroundColor: 'black'},
});

export default CountDown;
