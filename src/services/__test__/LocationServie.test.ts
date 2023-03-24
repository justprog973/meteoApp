import LocationService from '~/services/LocationService';

describe('LocationService', () => {
  test('Should return latitude & logitude from current location', async () => {
    const position = await LocationService.getCurrentPosition();
    expect(position).toEqual({
      latitude: 0,
      longitude: 0,
    });
  });
});
