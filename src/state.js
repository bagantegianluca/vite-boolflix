import { reactive } from 'vue';

export const state = reactive({
    apiUrl: "https://api.themoviedb.org/3/search/movie?api_key=d8aa3116ad4146a2a72906b3629ea879&language=it-IT",
    movies: []
});