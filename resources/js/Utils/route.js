import { Ziggy } from '@/ziggy';

/**
 * Generate a URL for a named route
 * @param {string} name - Route name
 * @param {object} params - Route parameters
 * @param {boolean} absolute - Generate absolute URL
 * @param {object} config - Ziggy configuration
 * @returns {string} Generated URL
 */
export function route(name, params = {}, absolute = false, config = Ziggy) {
    if (!config.routes[name]) {
        console.warn(`Route "${name}" not found`);
        return name;
    }

    let url = config.routes[name].uri;
    
    // Replace route parameters
    if (params && typeof params === 'object') {
        Object.keys(params).forEach(key => {
            url = url.replace(`{${key}}`, params[key]);
        });
    }
    
    // Clean up any remaining unreplaced parameters
    url = url.replace(/\{[^}]+\?\}/g, ''); // Optional parameters
    
    // Add leading slash if not present
    if (!url.startsWith('/')) {
        url = '/' + url;
    }
    
    // Return absolute or relative URL
    if (absolute && config.url) {
        const baseUrl = config.port ? `${config.url}:${config.port}` : config.url;
        return baseUrl + url;
    }
    
    return url;
}

export default route;

