<script>
import { state } from "../state.js";
import axios from "axios";
import LangFlag from "vue-lang-code-flags";

export default {
  name: "AppCard",
  data() {
    return {
      cast: [],
    };
  },
  components: {
    LangFlag,
  },
  props: {
    movie: Object,
  },
  methods: {
    getCast(id) {
      this.cast = [];
      axios
        .get(state.castApiUrl.replace("{movie_id}", id))
        .then((response) => {
          for (let i = 0; i < 5; i++) {
            this.cast.push(response.data.cast[i].name);
          }
        })
        .catch((error) => {
          console.error(error.message);
          this.cast.push("N.D.");
        });
    },
  },
};
</script>

<template>
  <div class="card" @mouseenter="getCast(movie.id)">
    <img
      onerror="this.onerror=null; this.src='../src/assets/img/no-image.jpg'"
      :src="'https://image.tmdb.org/t/p/w342/' + movie.poster_path"
      :alt="
        movie.hasOwnProperty('title')
          ? movie.title.replaceAll(' ', '-')
          : movie.name.replaceAll(' ', '-')
      "
    />
    <div class="movie-info">
      <label>Titolo:</label>
      <h3>{{ movie.hasOwnProperty("title") ? movie.title : movie.name }}</h3>
      <label>Titolo originale:</label>
      <h4>
        {{
          movie.hasOwnProperty("title")
            ? movie.original_title
            : movie.original_name
        }}
      </h4>
      <label>Cast</label>
      <div class="cast">{{ cast.join(", ") }}</div>
      <label>Tipo:</label>
      <div class="type">
        {{ movie.hasOwnProperty("title") ? "Film" : "Serie TV" }}
      </div>
      <label>Lingua:</label>
      <lang-flag
        :iso="movie.original_language === 'cn' ? 'zh' : movie.original_language"
      />
      <label>Valutazione:</label>
      <div class="vote">
        <i
          v-for="n in 5"
          :class="
            Math.round(movie.vote_average / 2) >= n
              ? 'fa-solid fa-star'
              : 'fa-regular fa-star'
          "
        >
        </i>
      </div>
      <label>Trama:</label>
      <div class="overview">{{ movie.overview }}</div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
  /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 50%);
  /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background: var(--blfx-primary);
  /* color of the scroll thumb */
  border-radius: 20px;
  /* roundness of the scroll thumb */
  border: 3px solid var(--blfx-dark);
  /* creates padding around scroll thumb */
}

::-webkit-scrollbar-thumb:hover {
  opacity: 1;
}

.card {
  position: relative;
  height: 100%;
  transition: all 0.25s;
  img {
    aspect-ratio: 1 / 1.5;
    /* height: 100%; */
    object-fit: cover;
    object-position: center;
  }
}

.movie-info {
  visibility: hidden;
  opacity: 0;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  padding-top: 0.5rem;
  border: 1px solid var(--blfx-light);
  background: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  transition: all linear 0.5s;
  i {
    color: var(--blfx-star);
  }
}

.card:hover {
  scale: 1.05;
  .movie-info {
    visibility: visible;
    opacity: 1;
  }
}

label {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--blfx-light);
}
.overview {
  font-size: 0.9rem;
}
</style>
