/**
 * Global Setup - Runs once before all tests
 * Used for setting up test environment
 */

import dotenv from 'dotenv';
import { Logger } from './src/utils/logger.js';

dotenv.config();

async function globalSetup(config) {
    Logger.section('Global Setup Started');
    
    // Initialize any required setup
    Logger.info('Initializing test environment...');
    Logger.info(`Environment: ${process.env.ENVIRONMENT || 'QA'}`);
    Logger.info(`Base URL: ${process.env.BASE_URL || 'http://localhost:3000'}`);
    
    // Add more setup tasks as needed
    // Example: Create test data, initialize database, etc.
    
    Logger.success('Global setup completed');
}

export default globalSetup;
