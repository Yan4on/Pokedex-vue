<template>
  <div id="pokemon"> 
    <h1></h1>
    <small></small>

    <div class="card">
      <div class="card-image">
        <figure>
          <img :src="currentImg || this.pokemon.front" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
              <p>id: {{this.pokemon.id}}</p>
            <p class="title is-4">{{ name | upper }}</p>
            <p class="subtitle is-6">Тип: {{ pokemon.type }}</p>
          </div>
        </div>

        <div class="content">
          <button class="button is-medium is-fullwidth" @click="changeSprite">
            Повернуть изображение
          </button>
          <button class="button is-medium is-fullwidth" @click="openInfo">
            <router-link v-bind:href="'/pokemon/' + this.pokemon.id"></router-link>
            Открыть информацию
          </button>

          <div class="info-container" v-if="isOpen">
            <h5>Базовый опыт :</h5>
            <p>
              <img src="https://kashira.legato.su/images/redstar_big.gif" />
              {{ pokemon.baseExp }}
            </p>
            <h5>Способности :</h5>
            <p>{{ pokemon.ability }}</p>
            <h5>Здоровье:</h5>
            <p>
              <img
                src="https://lady.webnice.ru/img/2012/03/img20120316173141_4594.gif"
              />
              {{ pokemon.health }}
            </p>
            <h5>Атака:</h5>
            <p>
              <img src="https://mycombats.org/i/fighttype3.gif" />
              {{ pokemon.attack }}
            </p>
            <h5>Защита:</h5>
            <p>
              <img src="http://ipb.su/medals/medal_131.gif" />
              {{ pokemon.defense }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created: function () {
    this.$http.get(this.url).then(
      (response) => {
        this.pokemon.id = response.data.id
        console.log(this.pokemon.id)
        this.pokemon.type = response.data.types[0].type.name;
        this.pokemon.front = response.data.sprites.front_default;
        this.pokemon.back = response.data.sprites.back_default;
        this.currentImg = response.data.sprites.other.dream_world.front_default;
        this.pokemon.ability = response.data.abilities[0].ability.name;
        this.pokemon.baseExp = response.data.base_experience;
        this.pokemon.health = response.data.stats[0].base_stat;
        this.pokemon.attack = response.data.stats[1].base_stat;
        this.pokemon.defense = response.data.stats[2].base_stat;
      },
      (error) => {
        console.error(error);
      }
    );
  },
  data() {
    return {
      isFront: true,
      isOpen: false,
      currentImg: "",
      pokemon: {
        type: "",
        front: "",
        back: "",
        ability: "",
        baseExp: "",
        attack: "",
        defense: "",
        health: "",
      },
    };
  },
  props: {
    name: String,
    url: String,
  },
  filters: {
    upper: function (value) {
      var newName = value[0].toUpperCase() + value.slice(1);
      return newName;
    },
  },
  methods: {
    changeSprite: function () {
      if (this.isFront) {
        this.isFront = false;
        this.currentImg = this.pokemon.back;
      } else {
        this.isFront = true;
        this.currentImg = this.pokemon.front;
      }
    },
    openInfo: function () {
      if (this.isOpen === false) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
      history.pushState(null, null, '/pokemon/' + this.pokemon.id);
    },
  },
};
</script>

<style scoped>
#pokemon {
  margin-top: 2%;
}
.info-container {
  padding-top: 10px;
}
</style>
