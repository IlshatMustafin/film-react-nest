import { TSKVLogger } from './tskv.logger';

describe('TSKVLogger', () => {
  let logger: TSKVLogger;

  beforeEach(() => {
    logger = new TSKVLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен форматировать сообщение в формат TSKV с табуляцией и переносом строки', () => {
    const formatted = logger.formatMessage('log', 'Server started');

    expect(formatted).toBe('level=log\tmessage=Server started\n');
  });

  it('должен корректно сериализовать дополнительные параметры и объекты', () => {
    const formatted = logger.formatMessage('warn', { code: 404 }, 'HttpModule');

    expect(formatted).toBe(
      'level=warn\tmessage={"code":404}\toptionalParams=["HttpModule"]\n',
    );
  });

  it('должен вызывать console.log с TSKV-строкой при вызове log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger.log('Test TSKV');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('level=log\tmessage=Test TSKV\n');
  });

  it('должен вызывать console.error с TSKV-строкой при вызове error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    logger.error('Critical failure');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('level=error\tmessage=Critical failure\n');
  });

  it('должен вызывать console.warn с TSKV-строкой при вызове warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    logger.warn('Deprecation warning');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      'level=warn\tmessage=Deprecation warning\n',
    );
  });
});
