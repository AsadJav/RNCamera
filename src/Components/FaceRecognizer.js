import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {COLORS} from '../utils/COLORS';
import AppIcon from './AppIcon';
import {launchCamera} from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import axios from 'axios';

function FaceRecognizer(props) {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [imgUri, setImgUri] = useState('');
  const [box, setBox] = useState(null);
  const [detected, setDetected] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState('');
  const [obj, setObj] = useState([{code: '', image_url: ''}]);
  const baseUrl = 'http://192.168.1.22:5000/compare';

  const fetchData = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
      };
      //console.log('Hiop');
      //console.log('OBJ', obj);
      await axios.post('http://192.168.1.44:5000/store', obj).then(response => {
        console.log('YES');
      });
      console.log('OKO');
    } catch (error) {
      console.log(error);
    }
  };

  const captureHandle = async () => {
    try {
      const options = {
        quality: 0.1,
        //mirrorImage: true,
        height: 1100,
        width: 1350,
        base64: true,
      };
      const data = await takePicture(options);

      obj[0].code = id;
      //obj.image = data.base64;
      //console.log("EXIF",data.exif)
      //console.log("PO",data.pictureOrientation)
      let imgType = 'data:image/jpeg;base64,';
      obj[0].image_url = imgType.concat(data.base64);
      //obj.image_url = data.uri;
      //console.log('IMG', img);
      setImgUri(data.uri);
      //console.log(obj.code);
      //console.log(obj.image);
      fetchData();
      //console.log(obj, obj.code);
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
      //console.log(faces[0].bottomMouthPosition);
      if (
        faces[0].bounds.origin.x > 60 &&
        faces[0].bounds.origin.x < 110 &&
        faces[0].bottomMouthPosition.y > 190 &&
        faces[0].bottomMouthPosition.y < 270
      ) {
        // if (
        //   faces[0].bottomMouthPosition.y > 190 &&
        //   faces[0].bottomMouthPosition.y < 270
        // ) {
        setDisabled(false);
        setBox({
          boxs: {
            // width: 150,
            // height: 180,
            //width: faces[0].bounds.size.width + 20,
            //height: faces[0].bounds.size.height + 30,
            x: 70,
            y: 100,
            color: 'green',
            //yawAngle: faces[0].yawAngle - faces[0].yawAngle,
            //rollAngle: faces[0].rollAngle + faces[0].rollAngle,
          },
        });
        //}
      } else {
        setBox({
          boxs: {
            // width: 150,
            // height: 180,
            x: 70,
            y: 100,
            color: 'red',
          },
        });
        setDisabled(true);
      }
    } else {
      setBox({
        boxs: {
          // width: 150,
          // height: 180,
          x: 70,
          y: 100,
          color: 'red',
        },
      });
      setDisabled(true);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Student Attendence System</Text>
      <TextInput
        placeholder="Your ID:"
        style={styles.ti}
        onChangeText={setId}
        value={id}
        caretHidden={true}
      />
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
                  // width: box.boxs.width,
                  // height: box.boxs.height,
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
          if (imgUri != '') {
            setImgUri('');
            setId('');
          }
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
  bound: ({x, y, color}) => {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: y,
      left: x + 10,
      width: 150,
      height: 180,
      borderWidth: 5,
      borderColor: color,
      zIndex: 3000,

      backgroundColor: 'transparent',
    };
  },
  ti: {borderBottomWidth: 1, width: '90%', marginBottom: 20},
});

export default FaceRecognizer;
