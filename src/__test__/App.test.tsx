import React from 'react';
import {View} from 'react-native';
import AppNavigator from '~/screens';
import App from '~/App';
import {render} from '@testing-library/react-native';

jest.mock('~/screens', () => jest.fn());

describe('App', () => {
  test('Should render routes', () => {
    (AppNavigator as jest.Mock).mockReturnValueOnce(
      <View testID="mock-routes" />,
    );

    const wrapper = render(<App />);
    wrapper.getByTestId('mock-routes');
  });
});
