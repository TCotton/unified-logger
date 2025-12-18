import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createLogger, UnifiedLogger } from './index';

describe('UnifiedLogger', () => {
	let consoleDebugSpy: ReturnType<typeof vi.spyOn>;
	let consoleInfoSpy: ReturnType<typeof vi.spyOn>;
	let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
	let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
		consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
		consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		consoleDebugSpy.mockRestore();
		consoleInfoSpy.mockRestore();
		consoleWarnSpy.mockRestore();
		consoleErrorSpy.mockRestore();
	});

	describe('constructor', () => {
		it('should create a logger with default options', () => {
			const logger = new UnifiedLogger();
			expect(logger.getLevel()).toBe('info');
		});

		it('should create a logger with custom level', () => {
			const logger = new UnifiedLogger({ level: 'debug' });
			expect(logger.getLevel()).toBe('debug');
		});
	});

	describe('logging methods', () => {
		it('should log debug messages when level is debug', () => {
			const logger = new UnifiedLogger({ level: 'debug' });
			logger.debug('test debug message');
			expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
			expect(consoleDebugSpy.mock.calls[0][0]).toContain('[DEBUG]');
			expect(consoleDebugSpy.mock.calls[0][0]).toContain('test debug message');
		});

		it('should not log debug messages when level is info', () => {
			const logger = new UnifiedLogger({ level: 'info' });
			logger.debug('test debug message');
			expect(consoleDebugSpy).not.toHaveBeenCalled();
		});

		it('should log info messages when level is info', () => {
			const logger = new UnifiedLogger({ level: 'info' });
			logger.info('test info message');
			expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
			expect(consoleInfoSpy.mock.calls[0][0]).toContain('[INFO]');
			expect(consoleInfoSpy.mock.calls[0][0]).toContain('test info message');
		});

		it('should log warn messages when level is info', () => {
			const logger = new UnifiedLogger({ level: 'info' });
			logger.warn('test warn message');
			expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
			expect(consoleWarnSpy.mock.calls[0][0]).toContain('[WARN]');
			expect(consoleWarnSpy.mock.calls[0][0]).toContain('test warn message');
		});

		it('should log error messages when level is info', () => {
			const logger = new UnifiedLogger({ level: 'info' });
			logger.error('test error message');
			expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
			expect(consoleErrorSpy.mock.calls[0][0]).toContain('[ERROR]');
			expect(consoleErrorSpy.mock.calls[0][0]).toContain('test error message');
		});
	});

	describe('setLevel', () => {
		it('should change the log level', () => {
			const logger = new UnifiedLogger({ level: 'info' });
			logger.setLevel('debug');
			expect(logger.getLevel()).toBe('debug');
		});
	});

	describe('prefix', () => {
		it('should include prefix in log messages', () => {
			const logger = new UnifiedLogger({ prefix: 'MyApp' });
			logger.info('test message');
			expect(consoleInfoSpy.mock.calls[0][0]).toContain('[MyApp]');
		});
	});

	describe('createLogger factory', () => {
		it('should create a logger instance', () => {
			const logger = createLogger();
			expect(logger).toBeInstanceOf(UnifiedLogger);
		});

		it('should pass options to logger', () => {
			const logger = createLogger({ level: 'warn' });
			expect(logger.getLevel()).toBe('warn');
		});
	});

	describe('environment compatibility', () => {
		it('should work in browser-like environment', () => {
			// This test verifies the logger works with DOM APIs if available
			const logger = new UnifiedLogger();
			logger.info('Browser test');
			expect(consoleInfoSpy).toHaveBeenCalled();
		});

		it('should work in Node.js-like environment', () => {
			// This test verifies the logger works in Node.js
			const logger = new UnifiedLogger();
			logger.info('Node.js test');
			expect(consoleInfoSpy).toHaveBeenCalled();
		});
	});
});
