export const isRequired = (str = 'Выполните обязательные действия') => (value) => {
    if (!value) return str;
}