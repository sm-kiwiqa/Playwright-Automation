/**
 * Logger utility for structured logging
 */

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

export class Logger {
    static info(message) {
        console.log(`${colors.cyan}ℹ INFO${colors.reset} - ${message}`);
    }

    static success(message) {
        console.log(`${colors.green}✓ SUCCESS${colors.reset} - ${message}`);
    }

    static warning(message) {
        console.log(`${colors.yellow}⚠ WARNING${colors.reset} - ${message}`);
    }

    static error(message) {
        console.log(`${colors.red}✗ ERROR${colors.reset} - ${message}`);
    }

    static debug(message, data) {
        if (process.env.DEBUG === 'true') {
            console.log(`${colors.magenta}🐛 DEBUG${colors.reset} - ${message}`, data);
        }
    }

    static step(stepNumber, description) {
        console.log(`${colors.bright}${colors.blue}→ Step ${stepNumber}: ${description}${colors.reset}`);
    }

    static section(title) {
        console.log(`\n${colors.bright}${colors.cyan}========== ${title} ==========${colors.reset}\n`);
    }

    static table(data) {
        console.table(data);
    }
}
