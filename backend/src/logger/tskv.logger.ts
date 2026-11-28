import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TSKVLogger implements LoggerService {
  private stringifyValue(value: unknown): string {
    if (typeof value === 'string') {
      return value.replace(/\t/g, ' ').replace(/\n/g, '\\n');
    }
    if (value instanceof Error) {
      return `${value.name}: ${value.message}`.replace(/\n/g, '\\n');
    }
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  formatMessage(
    level: string,
    message: unknown,
    ...optionalParams: unknown[]
  ): string {
    const parts: string[] = [
      `level=${level}`,
      `message=${this.stringifyValue(message)}`,
    ];

    if (optionalParams.length > 0) {
      parts.push(`optionalParams=${this.stringifyValue(optionalParams)}`);
    }

    return `${parts.join('\t')}\n`;
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('fatal', message, ...optionalParams));
  }
}
