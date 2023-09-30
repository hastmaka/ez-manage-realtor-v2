export const addController = (name, controller) => {
    if(!window.Ez) {
        window.Ez = {
            controller: {}
        }
    }

    if (!window.Ez.controller[name]) {
        window.Ez.controller[name] = controller
    }
    return window.Ez.controller[name]
}
