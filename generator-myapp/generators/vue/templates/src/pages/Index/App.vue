<template>
  <div id="app">
    hello
  </div>
</template>

<script>

import getData from './utils';
import back from '../../imgs/back@1x.png';

export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js',
            url: back,
            seen: true,
            todos: [
                { text: '1' },
                { text: '4' },
                { text: '3' },
            ],
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const data = await getData();
            this.msg = data;
        },
        reverseMessage() {
            this.msg = this.msg.split('').reverse().join('');
        },
    },
};
</script>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;

        h1 {
            color: #CC3333;
        }
    }
</style>
