import fetcher from '../../../../utils/_request';

export const updatedUser = (props) => fetcher
    .put('/users/', props)
    .then((data) => data)
    .catch((error) => error);

export const getAllUsers = (props) => fetcher
    .get('/users/list', props)
    .then((data) => data)
    .catch((error) => error);

export const createAUser = (props) => fetcher
    .post('/auth/sign-up', props)
    .then((data) => data)
    .catch((error) => error);

export const deleteUser = (id) => fetcher
    .delete(`/users/${id}`)
    .then((data) => data)
    .catch((error) => error);
