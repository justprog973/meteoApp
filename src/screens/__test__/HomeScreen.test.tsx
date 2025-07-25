import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '~/screens/HomeScreen';
import WeahterCurrent from '~/components/WeatherCurrent';
import {View} from 'react-native';
import WeahterCoordinates from '~/components/WeatherCoordinates';

jest.mock('~/components/WeatherCoordinates', () =>
  jest.fn().mockReturnValue(null),
);

jest.mock('~/components/WeatherCurrent', () => jest.fn().mockReturnValue(null));

describe('HomeScreen', () => {
  test('Should render corectly', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen');
  });

  describe('Title section', () => {
    beforeEach(() => {
      jest.useFakeTimers({legacyFakeTimers: false});
      jest.setSystemTime(new Date('2000-01-01').getTime()); //Saturday, 01 January 2000 00:00 UTC

      console.log(new Date().toString());
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('Should contain current date', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Jan 01, 2000');
    });

    test('Should contain current day', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Saturday');
    });
  });

  test('Should contain a section to get current weather', () => {
    (WeahterCurrent as jest.Mock).mockReturnValue(
      <View testID="mock-weather-current" />,
    );

    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('mock-weather-current');
  });

  test('Should contain a divider', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen-divider');
  });

  test('Should contain a section to get weather at given latitude & longitude ', () => {
    (WeahterCoordinates as jest.Mock).mockReturnValue(
      <View testID="mock-weather-coordinates" />,
    );

    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('mock-weather-coordinates');
  });
});
