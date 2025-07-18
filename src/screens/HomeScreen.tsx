import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '~/constants';
import moment from 'moment';
import WeahterCurrent from '~/components/WeatherCurrent';
import WeahterCoordinates from '~/components/WeatherCoordinates';

function HomeScreen() {
  const now = moment(new Date());
  return (
    <LinearGradient
      testID="home-screen"
      colors={[Colors.LIGHT_GRAY, Colors.DARKER_GRAY]}
      style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.date}>{now.format('MMM DD, YYYY')}</Text>
        <Text style={styles.day}>{now.format('dddd')}</Text>
      </View>
      <WeahterCurrent />
      <Text testID="home-screen-divider" style={styles.divider}>
        Or
      </Text>
      <WeahterCoordinates />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    alignContent: 'space-between',
    justifyContent: 'space-evenly',
  },
  title: {
    justifyContent: 'flex-end',
  },
  date: {
    color: Colors.GRAY,
    fontSize: 16,
  },
  day: {
    fontSize: 25,
    color: Colors.WHITE,
  },
  divider: {
    color: Colors.WHITE,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
