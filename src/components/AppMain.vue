<script>
import { state } from "../state.js";
import axios from "axios";
import AppCard from "./AppCard.vue";

export default {
  name: "AppMain",
  components: {
    AppCard,
  },
  data() {
    return {
      state,
    };
  },
  mounted() {
    axios
      .get(state.moviesApiUrl)
      .then((response) => {
        state.movies = response.data.results;
      })
      .catch((error) => {
        console.error(error.message);
      });
    axios
      .get(state.tvApiUrl)
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
        <h3 v-if="state.movies.length === 0">
          Nessun film selezionato con la ricerca effettuata
        </h3>
        <div class="col" v-for="movie in state.movies" v-else>
          <AppCard :movie="movie"></AppCard>
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

h2 {
  margin-bottom: 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-inline: -1rem;
}

h3 {
  margin-inline: 1rem;
}
.col {
  width: calc(100% / 6);
  padding: 1rem 0.5rem;
}

@media screen and (max-width: 1600px) {
  .col {
    width: 20%;
  }
}
@media screen and (max-width: 1300px) {
  .col {
    width: 25%;
  }
}
@media screen and (max-width: 1000px) {
  .col {
    width: calc(100% / 3);
  }
}
@media screen and (max-width: 750px) {
  .col {
    width: 50%;
  }
}
@media screen and (max-width: 500px) {
  .col {
    width: 100%;
  }
}
</style>
