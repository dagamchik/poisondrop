<template>
    <section class="container">
        <form class="container-form" action="">
            <AboutUser v-if="card === 1" @currentCard="toggle" :about="about"/>
            <InfoUser v-if="card === 2" :card="card" @backCard="backCard" @nextCard="toggle"/>
            <JobUser v-if="card === 3" :card="card" @backCard="backCard" @nextCard="toggle"/>
            <GithubInfo v-if="card === 4" :card="card" @backCard="backCard" @nextCard="toggle"/>
            <SuccessInfo v-if="card === 5" :card="card" @backCard="backCard" @nextCard="toggle"/>
        </form>
    </section>
</template>

<script>
import AboutUser from '@/components/AboutUser.vue';
import InfoUser from '@/components/InfoUser.vue';
import JobUser from '@/components/JobUser.vue';
import GithubInfo from '@/components/GithubInfo.vue';
import SuccessInfo from '@/components/SuccessInfo.vue';

export default {
    data() {
        return {
            card: 1,
            about: null,
        }
    },
    components: {
        AboutUser, InfoUser, JobUser, GithubInfo, SuccessInfo
    },
    methods: {
        toggle(e) {
            this.card += 1;
        },
        backCard(e) {
            this.card -= 1;
            console.log(this.card)
        },
    }
}
</script>

<style lang="scss">
    @import "@/styles/common.scss";
</style>