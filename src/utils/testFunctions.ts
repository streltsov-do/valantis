const LOG_EN = false;

export const logMe = (message?: any, ...optionalParams: any[]) => {
    if (LOG_EN) {
        console.log(message, ...optionalParams);
    }
};
