import fetcher from '../../../../utils/_request';

export const signIn = ({ email, password }) => fetcher
    .post('/auth/sign-in', { email, password })
    .then((data) => data)
    .catch((error) => error);

export const logout = (email) => fetcher
    .post('/auth/logout', { email })
    .then((data) => data)
    .catch((error) => error);
export const getUser = async () => fetch('http://localhost:5000/api/v1/users').then((res) => res.json());
