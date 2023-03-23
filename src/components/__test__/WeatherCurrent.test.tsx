import React from 'react';
import {render} from '@testing-library/react-native';

import WeahterCurrent from '~/components/WeatherCurrent';

describe('WeatherCurrent', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeahterCurrent />);
    wrapper.getByTestId('weather-current');
  });
});
