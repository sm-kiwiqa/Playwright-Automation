import { Logger } from './logger.js';
import { timeouts } from '../../config/testConfig.js';

/**
 * Test Helpers - Utility functions for common test operations
 */

/**
 * Retry a function until it succeeds
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delayMs - Delay between retries in ms
 */
export async function retryAsync(fn, maxRetries = 3, delayMs = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            Logger.debug(`Attempt ${attempt}/${maxRetries}`);
            return await fn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            Logger.warning(`Retry attempt ${attempt + 1}...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}

/**
 * Wait for a condition to be true
 * @param {Function} condition - Condition function
 * @param {number} timeout - Timeout in ms
 * @param {number} pollInterval - Poll interval in ms
 */
export async function waitForCondition(condition, timeout = timeouts.MEDIUM, pollInterval = 100) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        if (await condition()) {
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
    throw new Error(`Condition not met within ${timeout}ms`);
}

/**
 * Generate random string
 * @param {number} length - String length
 * @returns {string}
 */
export function generateRandomString(length = 10) {
    return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Generate random email
 * @returns {string}
 */
export function generateRandomEmail() {
    return `test_${generateRandomString(8)}@example.com`;
}

/**
 * Generate random number within range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
export function generateRandomNumber(min = 1, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get current timestamp
 * @returns {string}
 */
export function getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string}
 */
export function formatDate(date = new Date()) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Extract numeric value from string
 * @param {string} str - String to extract from
 * @returns {number}
 */
export function extractNumber(str) {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
}

/**
 * Check if string contains number
 * @param {string} str - String to check
 * @returns {boolean}
 */
export function containsNumber(str) {
    return /\d/.test(str);
}

/**
 * Sleep function
 * @param {number} ms - Milliseconds to sleep
 */
export function sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts
 */
export async function retryWithBackoff(fn, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            const delay = Math.pow(2, attempt - 1) * 1000;
            Logger.warning(`Retry in ${delay}ms...`);
            await sleep(delay);
        }
    }
}
