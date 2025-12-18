export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerOptions {
	level?: LogLevel;
	prefix?: string;
}

export class UnifiedLogger {
	private level: LogLevel;
	private prefix: string;

	constructor(options: LoggerOptions = {}) {
		this.level = options.level || 'info';
		this.prefix = options.prefix || '';
	}

	private shouldLog(level: LogLevel): boolean {
		const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
		const currentLevelIndex = levels.indexOf(this.level);
		const messageLevelIndex = levels.indexOf(level);
		return messageLevelIndex >= currentLevelIndex;
	}

	private formatMessage(level: LogLevel, message: string): string {
		const timestamp = new Date().toISOString();
		const prefix = this.prefix ? `[${this.prefix}] ` : '';
		return `${timestamp} ${prefix}[${level.toUpperCase()}] ${message}`;
	}

	debug(message: string): void {
		if (this.shouldLog('debug')) {
			console.debug(this.formatMessage('debug', message));
		}
	}

	info(message: string): void {
		if (this.shouldLog('info')) {
			console.info(this.formatMessage('info', message));
		}
	}

	warn(message: string): void {
		if (this.shouldLog('warn')) {
			console.warn(this.formatMessage('warn', message));
		}
	}

	error(message: string): void {
		if (this.shouldLog('error')) {
			console.error(this.formatMessage('error', message));
		}
	}

	setLevel(level: LogLevel): void {
		this.level = level;
	}

	getLevel(): LogLevel {
		return this.level;
	}
}

export function createLogger(options?: LoggerOptions): UnifiedLogger {
	return new UnifiedLogger(options);
}
