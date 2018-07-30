
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const example = Vue.component('example-component', require('./components/ExampleComponent.vue'));
const sample = Vue.component('sample-component', require('./components/SampleComponent.vue'));
const front = Vue.component('front-component', require('./components/FrontComponent.vue'));

const routes = [
  {
    path: '/',
    component: front
  },
  {
    path: '/example',
    component: example
  },
  {
    path: '/sample',
    component: sample
  }
];

const router = new VueRouter({
    routes
})

//Vue.component('example-component', require('./components/ExampleComponent.vue'));
//Vue.component('front-component', require('./components/FrontComponent.vue'));

const app = new Vue({
    el: '#app',
    router,
});
