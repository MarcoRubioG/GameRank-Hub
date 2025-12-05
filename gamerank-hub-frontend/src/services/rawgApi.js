import axios from 'axios';

const RAWG_API_KEY = '15e9524914704a66bbbb4197ae025cc2'; 
const RAWG_BASE_URL = 'https://api.rawg.io/api';

const rawgApi = axios.create({
    baseURL: RAWG_BASE_URL,
    params: {
        key: RAWG_API_KEY
    }
});

// Obtener juegos populares
export const getPopularGames = async (page = 1, pageSize = 20) => {
    try {
        const response = await rawgApi.get('/games', {
            params: {
                page,
                page_size: pageSize,
                ordering: '-rating' // Ordenar por rating
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener juegos de RAWG:', error);
        throw error;
    }
};

// Buscar juegos
export const searchGames = async (query, page = 1) => {
    try {
        const response = await rawgApi.get('/games', {
            params: {
                search: query,
                page,
                page_size: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al buscar juegos:', error);
        throw error;
    }
};

// Obtener detalles de un juego
export const getGameDetails = async (id) => {
    try {
        const response = await rawgApi.get(`/games/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener detalles del juego:', error);
        throw error;
    }
};

// Obtener juegos por género
export const getGamesByGenre = async (genreId, page = 1) => {
    try {
        const response = await rawgApi.get('/games', {
            params: {
                genres: genreId,
                page,
                page_size: 20
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener juegos por género:', error);
        throw error;
    }
};

// Obtener géneros
export const getGenres = async () => {
    try {
        const response = await rawgApi.get('/genres');
        return response.data;
    } catch (error) {
        console.error('Error al obtener géneros:', error);
        throw error;
    }
};

export default rawgApi;