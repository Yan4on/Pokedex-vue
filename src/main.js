import Vue from "vue";
import App from "./App.vue";
import VueResource from 'vue-resource';
import VueRouter from "vue-router";
import "../node_modules/bulma/css/bulma.css";
import Pokemon from "@/components/Pokemon";
import TermOfUse from "@/components/TermOfUse";
import Error from "@/components/Error";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
  },
  {
    path: "/term-of-use",
    component: TermOfUse,
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon',
    component: Pokemon,
  },
  {
    path: '/*',
    name: 'Error',
    component: Error,
  },
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
