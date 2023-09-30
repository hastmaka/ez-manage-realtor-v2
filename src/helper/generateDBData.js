export const generateDBData = (formData) => {
    const {name, last_name, email, phone, serviceName, ...rest} = formData;
    const date = Date.now()
    return   {
        active: true,
        created_at: date,
        updated_at: date,
        name, last_name, email, phone,
        status: 'pending',
        service: {
            ...rest,
            type: serviceName,
            note: [],
            updated_at: date,
        }
    }
}