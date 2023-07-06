import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CountDown from 'react-native-countdown-component';

function CountDownTimer(props) {
  const [isPlaying, setIsPlaying] = React.useState(true);

  //   const UrgeWithPleasureComponent = () => (

  //   );
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={10}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[10, 6, 3, 0]}
        isGrowing={true}
        isSmoothColorTransition={false}
        onComplete={() => ({shouldRepeat: true, delay: 2})}
        updateInterval={1}>
        {({remainingTime, color}) => (
          <Text style={{color, fontSize: 40}}>{remainingTime}</Text>
        )}
      </CountdownCircleTimer>
      <Button
        title="Toggle Playing"
        onPress={() => setIsPlaying(prev => !prev)}
      />
      <CountDown
        until={10}
        onFinish={() => alert('finished')}
        onPress={() => alert('hello')}
        size={20}
        digitStyle={{backgroundColor: 'transparent'}}
        digitTxtStyle={{color: 'gray'}}
        timeToShow={['S']}
        timeLabels={{s: 'SS'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CountDownTimer;
