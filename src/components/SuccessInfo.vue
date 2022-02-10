<template>
    <div class="user-info">
        <div class="user-info-input">
            <span style="font-weight: 600; color: blue;">Личная информация:</span>
            <ul>
                <li>Фамилия: <b>{{this.$store.state.mainInfo.surname}}</b></li>
                <li>Имя: <b>{{this.$store.state.mainInfo.name}}</b></li>
                <li>Дата рождения: <b>{{this.$store.state.mainInfo.birthday}}</b></li>
                <li>Номер телефона: <b>{{this.$store.state.mainInfo.phone}}</b></li>
                <li v-if="this.$store.state.mainInfo.emails !== null">Email: <b>{{this.$store.state.mainInfo.emails}}</b></li>
                <li v-if="this.$store.state.mainInfo.sex !== null">Пол: <b>{{this.$store.state.mainInfo.sex}}</b></li>
            </ul>
            <span style="font-weight: 600; color: blue;">Информация о кандидате:</span>
            <ul>
                <li>Образование: <b>{{this.$store.state.educationInfo.education}}</b></li>
                <li v-if="this.$store.state.educationInfo.frameworks.length > 0">Владение фреймворками: <b>{{this.$store.state.educationInfo.frameworks}}</b></li>
                <li v-if="this.$store.state.educationInfo.checkedSms !== null">Смс оповещения: <b>да</b></li>
                <li v-if="this.$store.state.educationInfo.checkedSms === null">Смс оповещения: <b>нет</b></li>
            </ul>
            <span style="font-weight: 600; color: blue;">Опыт работы:</span>
            <ul>
                <li v-for="item in this.$store.state.jobInfo" :key="item.label">{{item.label}}: <b>{{item.value}}</b></li>
            </ul>
            <span style="font-weight: 600; color: blue;">Профиль GITHUB:</span>
            <ul>
                <li>login: <b>{{this.$store.state.githubUser.login}}</b></li>
                <li>id: <b>{{this.$store.state.githubUser.id}}</b></li>
                <li>url: <b>{{this.$store.state.githubUser.url}}</b></li>
                <li>name: <b>{{this.$store.state.githubUser.name}}</b></li>
                <li>location: <b>{{this.$store.state.githubUser.location}}</b></li>
                <li>public_repos: <b>{{this.$store.state.githubUser.public_repos}}</b></li>
                <li>followers: <b>{{this.$store.state.githubUser.followers}}</b></li>
            </ul>
        </div>
        <div v-if="success === true">Поздравляем! Пользователь создан!</div>
        <div class="buttons">
            <button class="next-card" @click.prevent="submit()">
                Отправить
            </button>
        </div>
    </div>
</template>

<script>

export default {
    props: ['card'],
    data() {
        return {
           currentCard: 5,
           allInfo: {
                surname: '',
                name: '',
                birthday: '',
                phone: '',
                sex: '',
                email: '',
                education: '',
                frameworks: [],
                sms: '',
                job: [],
                user: {},
           },
           success: false,
        };
    },
    methods: {
        submit() {
            this.success = true;
            console.log(this.allInfo);
        },
        backCard() {
            this.$emit('backCard', this.card)
        },
    },
    mounted() {
        this.allInfo.surname = this.$store.state.mainInfo.surname;
        this.allInfo.name = this.$store.state.mainInfo.name;
        this.allInfo.birthday = this.$store.state.mainInfo.birthday;
        this.allInfo.phone = this.$store.state.mainInfo.phone;
        this.allInfo.sex = this.$store.state.mainInfo.sex;
        this.allInfo.email = this.$store.state.mainInfo.emails;
        this.allInfo.education = this.$store.state.educationInfo.education;
        this.allInfo.frameworks = this.$store.state.educationInfo.frameworks;
        this.allInfo.sms = this.$store.state.educationInfo.checkedSms;
        this.allInfo.job = this.$store.state.jobInfo;
        this.allInfo.user = this.$store.state.githubUser;
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