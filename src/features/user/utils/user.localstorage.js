export const saveUserData = (data) => localStorage.setItem('@user', JSON.stringify(data));
export const getUserData = () => JSON.parse(localStorage.getItem('@user'));
export const removeUserData = () => localStorage.removeItem('@user');
