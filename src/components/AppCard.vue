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
      :src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
      :alt="movie.title.replaceAll(' ', '-')"
    />
    <h3>{{ movie.title }}</h3>
    <h3>titolo originale: {{ movie.original_title }}</h3>
    <lang-flag
      :iso="movie.original_language === 'cn' ? 'zh' : movie.original_language"
    />
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
</template>

<style scoped>
.card {
  height: 100%;
  transition: all 0.25s;
}
.card:hover {
  scale: 1.05;
}

img {
  object-position: top;
}

.lang img {
  width: 25px;
}

i {
  color: var(--blfx-star);
}
</style>
