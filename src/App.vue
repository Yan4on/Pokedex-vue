<template>
  <div id="app">
  
    <router-link to="/home"> Главная </router-link>
    <router-link to="/term-of-use"> Правила пользования </router-link>
  
    <div class="column is-half is-offset-one-quarter">
      <p><router-view /> </p>
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
        @click="[clearAll(),searchResult()]" 
       
      >
        Найти
      </button>
      <button
        type="button"
        class="button is-fullwidth is-success"
        id="btnSearch"
        @click="reloadPage"
      >
        Показать случайного покемона
      </button>
      <div v-for="(poke) in filteredPokemons" :key="poke.id">
      <Pokemon :name="poke.name" :url="poke.url" />
      </div>
    </div>
  </div>
</template>

<script>
import Pokemon from "./components/Pokemon";


export default {
  name: "App",
  created: function() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=1&offset=555'
    url = url.split('555').join(Math.floor(Math.random() * 1001));
    this.$http.get(url).then(
      (response) => {
        this.pokemons = response.data.results;
        this.filteredPokemons = response.data.results;
        console.log(this.filteredPokemons)
        
        const parsed = JSON.stringify(this.filteredPokemons);
        localStorage.setItem('filteredPokemons', parsed);
      },
      (error) => {
        console.error(error);
      }
    );
  },
  mounted() {
  },
  watch: {
    
  },
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      search: "",
      randomPokemon: [],
    };
  },
  components: {
    Pokemon,
  },
  methods: {
    clearAll(){
      this.filteredPokemons = [];
    },
    searchResult: function() {
      if (this.search == "" || this.search == " ") {
        this.filteredPokemons = this.pokemons;
      } else {
        let url = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=1'
        
            this.$http.get(url).then(
      (response) => {
        this.pokemon = response.data.results;
        this.filteredPokemons = response.data.results;

         this.filteredPokemons = this.pokemon.filter(
          (pokemon) =>
            pokemon.name == this.search[0].toLowerCase() + this.search.slice(1)
        );
        console.log(this.filteredPokemons)
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
      console.log(this.filteredPokemons )
    },
    reloadPage() {
      window.location.reload();
    }
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
</style>
