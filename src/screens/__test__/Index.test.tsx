import {render, waitFor} from '@testing-library/react-native';
import React, {useEffect} from 'react';
import AppNavigation from '~/screens';
import HomeScreen from '~/screens/HomeScreen';
import {View} from 'react-native';
import WeahterScreen from '../WeatherScreen';
import {useNavigation} from '@react-navigation/native';

jest.mock('~/screens/HomeScreen', () => jest.fn());
jest.mock('~/screens/WeatherScreen', () => jest.fn());

describe('AppNavigator', () => {
  test('Should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );
    const wrapper = render(<AppNavigation />);
    await waitFor(() => {
      wrapper.getByTestId('mock-home-screen');
    });
  });

  test('Should render WeatherScreen on "Weather" route', async () => {
    (HomeScreen as jest.Mock).mockImplementationOnce(() => {
      const navigation = useNavigation();
      useEffect(() => {
        navigation.navigate('Weather' as never);
      }, [navigation]);
      return null;
    });

    (WeahterScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-weather-screen" />,
    );
    const wrapper = render(<AppNavigation />);
    await waitFor(() => {
      wrapper.getByTestId('mock-weather-screen');
    });
  });
});
