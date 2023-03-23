import {render} from '@testing-library/react-native';
import React from 'react';
import WeahterCoordinates from '~/components/WeatherCoordinates';

describe('WeatherCoordinates', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeahterCoordinates />);
    wrapper.getByTestId('weather-cordinates');
  });
});
