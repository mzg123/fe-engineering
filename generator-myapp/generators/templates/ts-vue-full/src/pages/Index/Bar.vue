<template>
    <div>
        <div class="foo">{{txt}}</div>
    </div>
</template>
<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
@Component
export default class List extends Vue {
    txt: string = this.$store.state.root;

    prosdata: string | undefined;

    dd = '909';

    onEmit(item: any): number {
        this.dd += item;
        return item; // 返回的值会当做父组件该方法的参数
    }

    watchDD(val: string): void {
        console.log('watchDD', val);
    }

    jump() {
        window.console.log(this.$route, 9999);
    }

    mounted() {
        window.console.log(this.$store, 7777);
    }
}
</script>
<style scoped lang="sass">
    .foo {
        color: red;
    }
</style>
