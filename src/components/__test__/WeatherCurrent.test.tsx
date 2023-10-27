import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';

import WeahterCurrent from '~/components/WeatherCurrent';
import {useNavigation} from '@react-navigation/native';
import LocationService from '~/services/LocationService';
import {act} from 'react-test-renderer';
import {Colors} from '~/constants';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  };
});

describe('WeatherCurrent', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeahterCurrent />);
    wrapper.getByTestId('weather-current');
  });

  // test('Should navigate to Weather screen with location', () => {
  //   throw new Error('Test not implemented');
  // });

  test('Should render label', () => {
    const wrapper = render(<WeahterCurrent />);
    wrapper.getByText('Weather at my  position');
  });

  test('Should navigate weather screen with location', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({
      navigate: mockNavigate,
    });

    const wrapper = render(<WeahterCurrent />);
    const button = wrapper.getByTestId('weather-current');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Loader', () => {
    test('Should be rendered when position is being fetched', async () => {
      let mockResolve!: (position: {
        latitude: number;
        longitude: number;
      }) => void;

      jest.spyOn(LocationService, 'getCurrentPosition').mockImplementationOnce(
        () =>
          new Promise(resolve => {
            mockResolve = resolve;
          }),
      );

      const wrapper = render(<WeahterCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await expect(
        wrapper.findByTestId('button-loading'),
      ).resolves.toBeDefined();
      await act(async () => {
        mockResolve({latitude: 0, longitude: 0});
      });
    });

    // test('Should not be rendered when position has been fetched', async () => {
    //   const wrapper = render(<WeahterCurrent />);
    //   const button = wrapper.getByTestId('weather-current');
    //   //Test event press button and full ohter event
    //   fireEvent.press(button);

    //   return expect(wrapper.findByTestId('button-loading')).rejects.toThrow();
    // });

    test('Should not be rendered when fething has failed', () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockImplementationOnce(new Error('') as any);

      const wrapper = render(<WeahterCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      return expect(wrapper.findByTestId('button-loading')).rejects.toThrow();
    });
  });

  describe('Error', () => {
    test('Should be displayed after fetching postition has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockImplementationOnce(new Error('') as any);

      const wrapper = render(<WeahterCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(async () => {
        expect(button).toHaveStyle({borderColor: Colors.ERROR});
      });
    });

    test('Should be reset after fetching postition again', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockImplementationOnce(new Error('') as any);

      const wrapper = render(<WeahterCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(async () => {
        fireEvent.press(button);
        expect(button).not.toHaveStyle({borderColor: Colors.ERROR});
      });
    });
  });
});
