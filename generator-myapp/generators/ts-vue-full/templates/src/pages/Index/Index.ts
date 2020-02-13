import Vue from 'vue';
import '@libjs';
import '@commjs';
import './Index.scss';
import App from './App.vue';
import router from './router';
import store from './store';

interface Person {
    name: string;
    age: number;
}

const tom: Person = {
    name: 'Tom',
    age: 25,
};

if (tom.age === 25) {
    console.log(tom.name);
}
const app = new Vue({
    el: '#root',
    components: { App },
    template: '<App/>',
    router,
    store,
});

console.log(app);
