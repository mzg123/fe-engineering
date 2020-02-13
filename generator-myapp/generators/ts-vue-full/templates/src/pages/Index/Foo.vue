<template>
    <div>
        <div class="foo">store的数据：{{txt}}</div>
        <div class="foo" @click="jump">跳转</div>
    </div>
</template>
<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import {
    State,
    //Getter,
    Action,
    Mutation,
    namespace
} from 'vuex-class';

const someModule = namespace('B');
@Component
export default class List extends Vue {
    @State('root') txt;
    @Mutation('rootTest') rootTest;
    @Action('ajaxRootTest') ajaxRootTest;
    @someModule.Action('actionB') actionB;

    onEmit(item: any): number {
        return item; // 返回的值会当做父组件该方法的参数
    }

    watchDD(val: string): void {
        console.log('watchDD', val);
    }

    jump() {
        window.console.log(this.$route, 9999);
        this.rootTest('mzg');
        this.txt = this.$store.state.A.a;
        this.actionB('987');
        this.ajaxRootTest('444')
            .then((result) => {
                window.alert(result);
            });
    }

    mounted() {
        window.console.log('');
    }
}
</script>
<style scoped lang="sass">
    .foo {
        color: blue;
    }
</style>
