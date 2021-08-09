export const formatService = (services, id = null) => {
    return id
        ? services.filter(item => item.parent === id)
        : services.filter(item => !('parent' in item));
}