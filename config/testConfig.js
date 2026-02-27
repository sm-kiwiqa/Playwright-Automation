import dotenv from 'dotenv';

dotenv.config();

/**
 * Test Configuration - Centralized configuration management
 */
export const config = {
    // Environment settings
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    environment: process.env.ENVIRONMENT || 'development',
    
    // Browser settings
    headless: process.env.HEADLESS === 'true' || false,
    slowMo: parseInt(process.env.SLOW_MO) || 0,
    
    // Timeout settings (in ms)
    timeout: parseInt(process.env.TIMEOUT) || 60000,
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT) || 30000,
    
    // Video and screenshot settings
    video: process.env.VIDEO || 'retain-on-failure',
    screenshot: process.env.SCREENSHOT || 'only-on-failure',
    
    // Parallel execution
    workers: parseInt(process.env.WORKERS) || 1,
    retries: parseInt(process.env.RETRIES) || 0,
    
    // Reporter settings
    reportDir: process.env.REPORT_DIR || 'playwright-report',
    
    // Custom settings
    debugMode: process.env.DEBUG === 'true' || false,
};

export const urls = {
    BASE: config.baseURL,
    LOGIN: `${config.baseURL}/login`,
    DASHBOARD: `${config.baseURL}/dashboard`,
};

export const testUsers = {
    admin: {
        username: process.env.ADMIN_USERNAME || 'windmillcorporation@mailinator.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@12345',
    },
    user: {
        username: process.env.USER_USERNAME || 'allprojectmanager@mailinator.com',
        password: process.env.USER_PASSWORD || 'Admin@12345',
    },
};

export const timeouts = {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 10000,
    EXTRA_LONG: 15000,
};

export const retryConfig = {
    maxRetries: 3,
    retryableErrors: ['Timeout', 'Network', 'ECONNREFUSED'],
};
