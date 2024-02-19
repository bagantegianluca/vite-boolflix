<script>
import { state } from "../state.js";
import axios from "axios";

export default {
  name: "AppHeader",
  data() {
    return {
      state,
      menu: [
        {
          text: "Home",
          active: true,
        },
        {
          text: "Serie TV",
          active: false,
        },
        {
          text: "Film",
          active: false,
        },
        {
          text: "Nuovi e popolari",
          active: false,
        },
        {
          text: "La mia lista",
          active: false,
        },
        {
          text: "Sfoglia per lingua",
          active: false,
        },
      ],
    };
  },
  methods: {
    toggleClass(item, index) {
      this.menu.forEach((item) => (item.active = false));
      this.menu[index].active = true;
    },
    loadData(search) {
      axios
        .get(state.moviesApiUrl + "&query=" + search)
        .then((response) => {
          state.movies = [...response.data.results];
        })
        .catch((error) => {
          console.error(error.message);
        });
      axios
        .get(state.tvApiUrl + "&query=" + search)
        .then((response) => {
          state.movies.push(...response.data.results);
        })
        .catch((error) => {
          console.error(error.message);
        });
      state.lastResearch = state.searchText;
      state.searchText = "";
    },
  },
  mounted() {
    axios
      .get(state.moviesApiUrl + "&query=signore")
      .then((response) => {
        state.movies = [...response.data.results];
      })
      .catch((error) => {
        console.error(error.message);
      });
    axios
      .get(state.tvApiUrl + "&query=signore")
      .then((response) => {
        state.movies.push(...response.data.results);
      })
      .catch((error) => {
        console.error(error.message);
      });
  },
};
</script>

<template>
  <header>
    <div class="container">
      <div class="left-side">
        <img src="../assets/img/logo-boolflix.png" alt="logo-boolflix" />
        <ul>
          <li
            v-for="(item, index) in menu"
            :class="item.active ? 'active' : ''"
            @click="toggleClass(item, index)"
          >
            <a href="#">{{ item.text }}</a>
          </li>
        </ul>
      </div>
      <div class="right-side">
        <ul>
          <li>
            <div>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Titolo film o serie TV"
                v-model="state.searchText"
                @keyup.enter="loadData(state.searchText)"
              />
              <button @click="loadData(state.searchText)">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </li>
          <li><a href="#">Bambini</a></li>
          <li><i class="fa-regular fa-bell"></i></li>
          <li><img src="../assets/img/user.jpg" alt="user" /></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  z-index: 1000;
  width: 100%;
  background: var(--blfx-dark);
  padding-block: 20px;
}

.container {
  display: flex;
  justify-content: space-between;
}

img {
  width: 90px;
}

.left-side,
.right-side {
  display: flex;
  align-items: center;
}
.left-side {
  ul {
    display: flex;
    margin-left: 25px;
  }
  li {
    margin-left: 20px;
    font-size: 14px;
  }
  .active {
    color: var(--blfx-light);
    font-weight: bold;
  }
}

.right-side {
  ul {
    display: flex;
    align-items: center;
    li {
      margin-left: 25px;
      img {
        aspect-ratio: 1;
        width: 32px;
      }
      input {
        color: var(--blfx-dark);
        padding: 0.25rem;
        margin-right: 0.5rem;
      }
      button {
        background: transparent;
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;
        cursor: pointer;
        i {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
