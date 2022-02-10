<template>
    <div class="user-info">
        <div class="user-info-input">
            <span>GITHUB</span>
            <div class="search__user">
                <input type="text" placeholder="Введите username github" @change="userName($event)">
                <button class="search__user-btn" @click.prevent="findUser">Найти</button>
            </div>
        </div>
        <div class="success" style="color: green; margin-bottom: 20px;" v-if="findUserData === true">
            Пользователь найден! Нажмите кнопку вперед!
        </div>
        <div class="error" style="color: red; margin-bottom: 20px;" v-if="findUserData === false">
            Пользователь не найден. Проверьте правильно ввода
        </div>
        <div class="buttons">
            <button class="prev-card" @click.prevent="backCard()">
                Назад
            </button>
            <button class="next-card" @click.prevent="checkValidate()">
                Вперед
            </button>
        </div>
    </div>
</template>

<script>

export default {
    props: ['card'],
    data() {
        return {
           currentCard: 4,
           user: [],
           username: '',
           findUserData: null,
        };
    },
    methods: {
        checkValidate() {
            if (this.$store.state.githubUser) {
                this.$emit('nextCard', this.currentCard)
            }
        },
        userName(e) {
            this.username = e.target.value;
        },
        backCard() {
            this.$emit('backCard', this.card)
        },
        async findUser() {
            let username = this.username;
            await fetch(`https://api.github.com/users/${username}`)
                .then(async (res) => {
                    this.user = await res.json();
                    let obj = {
                        login: this.user.login,
                        id: this.user.id,
                        url: this.user.url,
                        name: this.user.name,
                        location: this.user.location,
                        public_repos: this.user.public_repos,
                        followers: this.user.followers,
                        following: this.user.following
                    }
                    if (obj.id === undefined) {
                        this.findUserData = false;
                    } else if (obj.id !== undefined) {
                        this.findUserData = true;
                        this.$store.commit('addUserGithub', obj)
                    }
                    
                })
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
    .search__user {
        display: flex;
        &-btn {
            border: none;
            border-radius: 10px;
            padding: 10px;
            background-color: rgb(54, 54, 202);
            color: #fff;
            cursor: pointer;
            transition: .3s ease-in-out;
            margin-left: 30px;
            &:hover {
                background-color: rgb(158, 158, 248);
            }
        }
    }
</style>