<script>
import LangFlag from "vue-lang-code-flags";

export default {
  name: "AppCard",
  components: {
    LangFlag,
  },
  props: {
    movie: Object,
  },
};
</script>

<template>
  <div class="card">
    <img
      onerror="this.onerror=null; this.src='../src/assets/img/no-image.png'"
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
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  height: 100%;
  transition: all 0.25s;
  border: 1px solid black;
  box-shadow: 0px 0px 0px 1px var(--blfx-light) inset;
  img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.movie-info {
  display: none;
}

.card:hover {
  scale: 1.05;
  .movie-info {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
    padding-top: 0;
    border: 1px solid var(--blfx-light);
    background: rgba(0, 0, 0, 0.65);
    width: 100%;
    height: 100%;
    bag .lang img {
      width: 25px;
    }
    i {
      color: var(--blfx-star);
    }
  }
}

label {
  display: block;
  margin-top: 1rem;
}
</style>
