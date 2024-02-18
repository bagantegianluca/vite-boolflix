<script>
import { state } from "../state.js";
import axios from "axios";

export default {
  name: "AppMain",
  data() {
    return {
      state,
    };
  },
  mounted() {
    axios
      .get(state.apiUrl)
      .then((response) => {
        state.movies = response.data.results;
      })
      .catch((error) => {
        console.error(error.message);
      });
  },
};
</script>

<template>
  <main>
    <div class="container">
      <h2>Film ricercati</h2>
      <div class="row">
        <div class="col" v-for="movie in state.movies">
          <div class="card">
            <img
              :src="
                'https://api.themoviedb.org/3/movie/' +
                movie.id +
                '/images/' +
                movie.poster_path
              "
              :alt="movie.title.replaceAll(' ', '-')"
            />
            <h3>titolo: {{ movie.title }}</h3>
            <h3>titolo originale: {{ movie.original_title }}</h3>
            <div class="lang">lingua orig.: {{ movie.original_language }}</div>
            <div class="vote">voto: {{ movie.vote_average }}</div>
            <div class="id">id: {{ movie.id }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background: var(--blfx-dark);
  padding-top: 100px;
  min-height: 100vh;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-inline: -1rem;
}

.col {
  width: 25%;
  padding: 1rem;
  border: 1px solid var(--blfx-light);
}
</style>
