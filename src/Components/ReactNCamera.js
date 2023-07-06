import React, {useCallback} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AppIcon from './AppIcon';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
//import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function ReactNCamera(props) {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
    } catch (e) {
      console.log(e);
    }
  };
  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchCamera(options);
  }, []);
  return (
    <View style={styles.container}>
      {/* <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.front}
        style={styles.cam}>
        <Button title="Capture" onPress={() => captureHandle()} />
      </RNCamera> */}
      <AppIcon IconName={'camera'} IconSize={40} onPressIcon={onCameraPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cam: {flex: 1, justifyContent: 'flex-end'},
});

export default ReactNCamera;
