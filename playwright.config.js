import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: 'main',
    timeout: 60000,
    use: {
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    reporter: [['html']],
});
