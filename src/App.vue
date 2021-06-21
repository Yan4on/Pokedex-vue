<template>
  <div id="app">
    <div class="topnav">
      <button
        @click="clearAll()"
        class="button is-fullwidth is-success btn-menu"
        v-on:click="isHidden = false"
      >
        <router-link to="/"> Главная </router-link>
      </button>
      <br />
      <br />
      <button
        class="button is-fullwidth is-success btn-menu"
        v-on:click="isHidden = true"
        v-if="!isHidden"
      >
        <router-link to="/term-of-use"> Правила пользования </router-link>
      </button>
    </div>
    <router-view />
    <div v-if="!isHidden">
      <div class="column is-half is-offset-one-quarter">
        <input
          type="text"
          placeholder="Поиск по имени"
          v-model="search"
          class="input is-rounded"
        />
        <button
          type="button"
          class="button is-fullwidth is-success"
          id="btnSearch"
          @click="[clearAll(), searchResult()]"
        >
          Найти
        </button>
        <button
          type="button"
          class="button is-fullwidth is-success"
          id="btnSearch"
          @click="
            clearAll();
            getRandomPokemon();
          "
        >
          Показать случайного покемона
        </button>
        <div v-for="poke in filteredPokemons" :key="poke.id">
          <Pokemon :name="poke.name" :url="poke.url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pokemon from "./components/Pokemon";
export default {
  name: "App",
  created: function() {
    this.pokemonName = this.$route.params.id.toLowerCase();
    // console.log(this.pokemonName);
    let url = "https://pokeapi.co/api/v2/pokemon?limit=1&offset=11000";
    url = url.split("11000").join(this.pokemonName - 1);

    this.$http.get(url).then(
      (response) => {
        console.log(url);
        this.pokemons = response.data.results;
        this.filteredPokemons = response.data.results;
        // console.log(this.filteredPokemons);
      },
      (error) => {
        console.error(error);
      }
    );
  },
  mounted() {},
  watch: {},
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      search: "",
      isHidden: false,
    };
  },
  components: {
    Pokemon,
  },
  methods: {
    getRandomPokemon() {
      let url = "https://pokeapi.co/api/v2/pokemon?limit=1&offset=555";
      url = url.split("555").join(Math.floor(Math.random() * 1001));
      this.$http.get(url).then(
        (response) => {
          this.pokemons = response.data.results;
          this.filteredPokemons = response.data.results;
          // this.pokemonDataID = response.data.results[0].url.match(
          //   /\/([^/]+)\/?$/
          // )[1];
          // console.log(this.pokemonDataID);
          // console.log(this.filteredPokemons);
        },
        (error) => {
          console.error(error);
        }
      );
    },
    clearAll() {
      this.filteredPokemons = [];
    },
    searchResult: function() {
      if (this.search == "" || this.search == " ") {
        this.filteredPokemons = this.pokemons;
      } else {
        let url = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=1";

        this.$http.get(url).then(
          (response) => {
            this.pokemon = response.data.results;
            this.filteredPokemons = response.data.results;

            this.filteredPokemons = this.pokemon.filter(
              (pokemon) =>
                pokemon.name ==
                this.search[0].toLowerCase() + this.search.slice(1)
            );
            // console.log(this.filteredPokemons);
          },
          (error) => {
            console.error(error);
          }
        );
        // this.filteredPokemons = this.pokemons.filter(
        //   (pokemon) =>
        //     pokemon.name == this.search[0].toLowerCase() + this.search.slice(1)
        // );
      }
      // console.log(this.filteredPokemons);
    },
  },
  computed: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#btnSearch {
  margin-top: 2%;
}

.topnav {
  display: flex;
  justify-content: center;
}

.btn-menu {
  width: auto !important;
  background-color: #72c0e2 !important;
  margin-right: 1%;
}

.btn-menu:hover {
  background-color: #77e29d !important;
}

.btn-menu:active {
  background-color: #48c774 !important;
}

a {
  color: #ffffff !important;
}
</style>
