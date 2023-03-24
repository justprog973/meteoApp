import {render} from '@testing-library/react-native';
import React from 'react';
import WeahterScreen from '~/screens/WeatherScreen';

describe('WeatherScreen', () => {
  test('Should render correctely', () => {
    const wrapper = render(<WeahterScreen />);
    wrapper.getByTestId('weather-screen');
  });
});
