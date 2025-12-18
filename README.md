# unified-logger

TypeScript logger that works on both the server and client

## Features

- 🚀 Pure ESM package (no CommonJS)
- 📦 TypeScript support with full type definitions
- 🌐 Works in Node.js, Bun, and browser environments
- 🎨 Formatted and linted with Biome
- ✅ Tested with Vitest in multiple environments
- 📝 Configurable log levels and prefixes

## Installation

```bash
npm install unified-logger
```

## Usage

```typescript
import { createLogger, UnifiedLogger } from 'unified-logger';

// Create a logger with default settings
const logger = createLogger();
logger.info('Hello, world!');

// Create a logger with custom options
const customLogger = new UnifiedLogger({
  level: 'debug',
  prefix: 'MyApp'
});

customLogger.debug('Debug message');
customLogger.info('Info message');
customLogger.warn('Warning message');
customLogger.error('Error message');

// Change log level dynamically
customLogger.setLevel('warn'); // Only warn and error messages will be logged
```

## API

### `createLogger(options?: LoggerOptions): UnifiedLogger`

Factory function to create a new logger instance.

### `new UnifiedLogger(options?: LoggerOptions)`

Creates a new logger instance.

#### Options

- `level?: LogLevel` - Minimum log level to display. Options: `'debug' | 'info' | 'warn' | 'error'`. Default: `'info'`
- `prefix?: string` - Optional prefix to add to all log messages. Default: `''`

#### Methods

- `debug(message: string): void` - Log a debug message
- `info(message: string): void` - Log an info message
- `warn(message: string): void` - Log a warning message
- `error(message: string): void` - Log an error message
- `setLevel(level: LogLevel): void` - Change the log level
- `getLevel(): LogLevel` - Get the current log level

## Development

### Prerequisites

- Node.js >= 18.0.0
- npm

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests in specific environments
npm run test:node       # Node.js environment
npm run test:browser    # Browser-like environment (happy-dom)

# Lint and format
npm run lint            # Check for linting issues
npm run format          # Format code
npm run check           # Run both linting and formatting checks
npm run check:fix       # Auto-fix linting and formatting issues
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run tests
- `npm run test:node` - Run tests in Node.js environment
- `npm run test:browser` - Run tests in browser environment
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint source code
- `npm run format` - Format source code
- `npm run format:check` - Check code formatting
- `npm run check` - Run linting and formatting checks
- `npm run check:fix` - Auto-fix issues

## License

ISC
