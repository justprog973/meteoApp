import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import LocationService from '~/services/LocationService';
import Button from '~/components/Button';
import {StyleSheet} from 'react-native';
import {Colors} from '~/constants';

function WeahterCurrent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigation = useNavigation();

  const handleFetchWeather = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const position = await LocationService.getCurrentPosition();
      navigation.navigate('Weather' as never, position as never);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }, [navigation]);

  return (
    <Button
      testID="weather-current"
      label="Weather at my  position"
      onPress={handleFetchWeather}
      loading={loading}
      style={error && styles.error}
    />
  );
}

const styles = StyleSheet.create({
  error: {
    borderColor: Colors.ERROR,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default WeahterCurrent;
