import fetcher from '../../../../utils/_request';

export const updatedUser = (props) => fetcher
    .put('/users/', props)
    .then((data) => data)
    .catch((error) => error);

export const getUser = async () => fetch('http://localhost:5000/api/v1/users').then((res) => res.json());
