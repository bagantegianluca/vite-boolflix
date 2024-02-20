import { reactive } from 'vue';

export const state = reactive({
    moviesApiUrl: "https://api.themoviedb.org/3/search/movie?api_key=d8aa3116ad4146a2a72906b3629ea879&language=it-IT",
    tvApiUrl: "https://api.themoviedb.org/3/search/tv?api_key=d8aa3116ad4146a2a72906b3629ea879&language=it-IT",
    castApiUrl: 'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=d8aa3116ad4146a2a72906b3629ea879',
    genreApiUrl: 'https://api.themoviedb.org/3/genre/{movie/tv}/list?api_key=d8aa3116ad4146a2a72906b3629ea879&language=it-IT',
    searchText: "",
    lastResearch: "",
    movies: []
});