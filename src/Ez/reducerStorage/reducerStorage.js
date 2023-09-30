const reducerStorage = {};
const subscriptions = {};

export const saveReducer = (name, reducer) => {
    reducerStorage[name] = reducer;
    if (subscriptions[name]) {
        subscriptions[name].map((callback) => callback(reducer));
    }
};

export const getReducer = (name, callback) => {
    if (typeof callback === 'function') {
        if (!subscriptions[name]) {
            subscriptions[name] = [];
        }
        subscriptions[name].push(callback);
        return () => {
            subscriptions[name] = subscriptions[name].filter((cb) => cb !== callback);
        };
    }
    return reducerStorage[name];
};

export const resetReducer = (name) => delete reducerStorage[name]