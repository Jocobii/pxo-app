const BASE_URL = 'https://rickandmortyapi.com/api/';

const characterUrl = `${BASE_URL}character/`;

export const getCharacters = async () => fetch(`${characterUrl}2`).then((res) => res.json());

export default getCharacters;
