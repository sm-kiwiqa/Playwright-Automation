import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { config } from './config/testConfig.js';

dotenv.config();

/**
 * Enhanced Playwright Configuration
 * Supports multiple browsers, reporters, and environments
 */
export default defineConfig({
    // Test directory
    testDir: 'main',
    testMatch: '**/*.spec.js',
    
    // Global test timeout
    timeout: config.timeout,
    
    // Expect timeout
    expect: { timeout: 5000 },
    
    // Global setup/teardown
    // globalSetup: require.resolve('./global-setup'),
    // globalTeardown: require.resolve('./global-teardown'),
    
    // Parallel execution
    fullyParallel: true,
    workers: config.workers,
    
    // Failure settings
    retries: config.retries,
    
    // Reporting
    reporter: [
        ['html', { outputFolder: config.reportDir, open: 'never' }],
        ['json', { outputFile: `${config.reportDir}/results.json` }],
        ['junit', { outputFile: `${config.reportDir}/junit.xml` }],
        ['list'],
        // Uncomment for CI/CD reporting
        // ['github']
    ],
    
    // Shared settings for all projects
    use: {
        baseURL: config.baseURL,
        headless: config.headless,
        slowMo: config.slowMo,
        screenshot: config.screenshot,
        video: config.video,
        trace: 'on-first-retry',
        navigationTimeout: config.navigationTimeout,
        actionTimeout: config.timeout,
    },
    
    // Browser projects
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        
        // Mobile browsers (optional)
        /* 
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
        */
    ],
    
    // Web server configuration (optional - for starting dev server)
    /* 
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
    */
});

