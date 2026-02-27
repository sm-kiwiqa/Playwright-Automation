/**
 * Global Teardown - Runs once after all tests
 * Used for cleaning up test environment
 */

import { Logger } from './src/utils/logger.js';

async function globalTeardown(config) {
    Logger.section('Global Teardown Started');
    
    // Clean up resources
    Logger.info('Cleaning up test environment...');
    
    // Add cleanup tasks as needed
    // Example: Delete test data, close connections, etc.
    
    Logger.success('Global teardown completed');
}

export default globalTeardown;
