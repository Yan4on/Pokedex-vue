import Vue from "vue";
import App from "./App.vue";
import VueResource from 'vue-resource';
import VueRouter from "vue-router";
import "../node_modules/bulma/css/bulma.css";
import Pokemon from "@/components/Pokemon";
import TermOfUse from "@/components/TermOfUse";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App,
  },
  {
    path: "/term-of-use",
    component: TermOfUse,
  },
  {
    path: "/pokemon:id",
    component: Pokemon,
  }
];
const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
