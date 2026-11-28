import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен корректно форматировать сообщение в JSON-строку', () => {
    const formatted = logger.formatMessage('log', 'Test message', { id: 1 });
    const parsed = JSON.parse(formatted) as {
      level: string;
      message: string;
      optionalParams: unknown[];
    };

    expect(parsed).toEqual({
      level: 'log',
      message: 'Test message',
      optionalParams: [{ id: 1 }],
    });
  });

  it('должен вызывать console.log с JSON при вызове метода log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger.log('Hello JSON', 'Context');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: 'Hello JSON',
        optionalParams: ['Context'],
      }),
    );
  });

  it('должен вызывать console.error с JSON при вызове метода error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    logger.error('Error occurred', 'Stacktrace');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'error',
        message: 'Error occurred',
        optionalParams: ['Stacktrace'],
      }),
    );
  });

  it('должен вызывать console.warn с JSON при вызове метода warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    logger.warn('Warning message');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'warn',
        message: 'Warning message',
        optionalParams: [],
      }),
    );
  });

  it('должен вызывать console.debug с JSON при вызове метода debug', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});

    logger.debug('Debug info');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'debug',
        message: 'Debug info',
        optionalParams: [],
      }),
    );
  });

  it('должен вызывать console.log с уровнем verbose при вызове метода verbose', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    logger.verbose('Verbose info');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'verbose',
        message: 'Verbose info',
        optionalParams: [],
      }),
    );
  });
});
