import { MrmClientService } from './mrm-client';

describe('MRM Client service', () => {
  const dataService = new MrmClientService();

  describe('getCarburantData', () => {
    it('should return undefined when Carburant label is unknown', () => {
      // given
      const carburantLabel = 'nitro';

      // when
      const carburantData = dataService.getCarburantData(carburantLabel);

      // then
      expect(carburantData).toBeUndefined();
    });
  });
});
