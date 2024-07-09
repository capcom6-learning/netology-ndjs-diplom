import { RequestsLoggerMiddleware } from './request-logger.middleware';

describe('RequestLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new RequestsLoggerMiddleware()).toBeDefined();
  });
});
