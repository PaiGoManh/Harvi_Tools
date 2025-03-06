const CustomError = require('./CreateError');

/**
 * Function to print messages to the console in development mode.
 * @param {string} message - The main message to print.
 * @param {...any} rest - Additional data to print.
 */
const devPrint = (message, ...rest) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(message, ...rest);
    }
};

const getEnvironmentVariable = (variableName) => {
    const value = process.env[variableName];
    if (value === undefined || value === null) {
        throw new CustomError('UNDEFINED_ENV', `${variableName} is not defined in the environment `);
    }
    return value;
};

const getRoute = (productionRouteEnvVariableName, developmentRoute) => {
    return process.env.NODE_ENV === 'production'
        ? getEnvironmentVariable(productionRouteEnvVariableName)
        : developmentRoute;
};

module.exports = {
    devPrint,
    getEnvironmentVariable,
    getRoute
};