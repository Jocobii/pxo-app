import fetcher from '../../../../utils/_request';

export const signIn = ({ email, password }) => fetcher
    .post('/auth/sign-in', { email, password })
    .then((data) => data)
    .catch((error) => error);
// fetch(signUp).then((res) => res.json());
export const getUser = async () => fetch('http://localhost:5000/api/v1/users').then((res) => res.json());
