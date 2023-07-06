import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {COLORS} from '../utils/COLORS';
import AppIcon from './AppIcon';
import {launchCamera} from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import CountDown from 'react-native-countdown-component';

function FaceRecognizer(props) {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [imgUri, setImgUri] = useState('');
  const [box, setBox] = useState(null);
  const [detected, setDetected] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // setTimeout(() => {
  //   console.log('10 sec.');
  // }, 10000);

  const captureHandle = async () => {
    try {
      const options = {
        quality: 1,
        mirrorImage: true,
      };
      const data = await takePicture(options);
      console.log(data.uri);
      setImgUri(data.uri);
      CameraRoll.save(data.uri);
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

  const handleDetector = ({faces}) => {
    setDetected(true);
    if (faces[0]) {
      //console.log(faces[0].bounds);
      if (faces[0].bounds.origin.x > 50 && faces[0].bounds.origin.x < 120) {
        if (faces[0].bounds.origin.y > 110 && faces[0].bounds.origin.y < 190) {
          setDisabled(false);
          setBox({
            boxs: {
              width: 170,
              height: 200,
              //width: faces[0].bounds.size.width + 20,
              //height: faces[0].bounds.size.height + 30,
              x: 60,
              y: 80,
              color: 'green',
              //yawAngle: faces[0].yawAngle - faces[0].yawAngle,
              //rollAngle: faces[0].rollAngle + faces[0].rollAngle,
            },
          });
        }
      } else {
        setBox({
          boxs: {
            width: 170,
            height: 200,
            x: 60,
            y: 80,
            color: 'red',
          },
        });
        setDisabled(true);
      }
    } else {
      setBox({
        boxs: {
          width: 170,
          height: 200,
          x: 60,
          y: 80,
          color: 'red',
        },
      });
      setDisabled(true);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Student Attendence System</Text>
      <View style={styles.outerView}>
        {!imgUri && (
          <RNCamera
            ref={cameraRef}
            style={styles.cam}
            type={RNCamera.Constants.Type.front}
            playSoundOnCapture={true}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.off}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            whiteBalance={RNCamera.Constants.WhiteBalance.sunny}
            faceDetectionLandmarks={
              RNCamera.Constants.FaceDetection.Landmarks.all
            }
            onFacesDetected={res => {
              //console.log(res.faces);
              handleDetector(res);
            }}>
            {detected === true && (
              <TouchableOpacity
                // onPress={() => {
                //   captureHandle();
                // }}
                style={styles.bound({
                  width: box.boxs.width,
                  height: box.boxs.height,
                  x: box.boxs.x,
                  y: box.boxs.y,
                  color: box.boxs.color,
                })}>
                {/* {!disabled && (
                  <CountDown
                    until={10}
                    //onFinish={() => alert('finished')}
                    size={60}
                    digitStyle={{backgroundColor: 'transparent'}}
                    digitTxtStyle={{color: 'gray'}}
                    timeToShow={['S']}
                  />
                )} */}
              </TouchableOpacity>
            )}
          </RNCamera>
        )}
        {imgUri && <Image source={{uri: imgUri}} style={styles.img} />}
      </View>

      <AppIcon
        IconName={'camera'}
        IconSize={50}
        IconColor={COLORS.white}
        disabled={disabled}
        onPressIcon={() => {
          setImgUri('');
          captureHandle();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.aquamarine,
    alignItems: 'center',
  },
  outerView: {
    width: 300,
    height: 400,
  },
  pic: {
    width: 150,
    height: 210,
    backgroundColor: 'transparent',
    borderColor: COLORS.red,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderRadius: 120,
  },
  txt: {marginTop: 30, fontWeight: 'bold', fontSize: 25, marginBottom: 30},
  cam: {
    width: 300,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {width: '100%', height: '100%'},
  bound: ({width, height, x, y, color}) => {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: y,
      left: x + 10,
      width,
      height,
      borderWidth: 5,
      borderColor: color,
      zIndex: 3000,

      backgroundColor: 'transparent',
    };
  },
});

export default FaceRecognizer;
