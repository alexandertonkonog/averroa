export const isRequired = (str = 'Выполните обязательные действия') => (value) => {
    if (!value) return str;
}
export const isLength = (min = 3, max = 50, str = 'имя') => (value) => {
    if (!value) return `Заполните поле ${str}`;
    if (value.length < min) {
        return `Длина поля ${str} должна быть не меньше ${min} символов`;
    }
    if (value.length > max) {
        return `Длина поля ${str} должна быть не больше ${max} символов`;
    }
}
export const isEqual = (str, error) => (value) => {
    console.log(str)
    if (!value) return 'Поле код обязательно';
    if (str !== value) return error;
}