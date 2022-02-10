<template>
    <div class="user-info">
        <div class="user-info-input">
            <span>Фамилия*</span>
            <input type="text" class="surname" placeholder="Введите фамилию" v-model="surname">
            <span class="error-msg" v-if="$v.surname.$error">
                <template v-if="!$v.surname.maxLength">
                Длина фамилии не должна превышать {{ $v.surname.$params.maxLength.max }} символов
                </template>
                <template v-else-if="!$v.surname.minLength">
                Длина фамилии должна превышать {{ $v.surname.$params.minLength.min }} символа
                </template>
                <template v-else-if="!$v.surname.required">
                Фамилия обязательно для заполнения
                </template>
                <template v-else-if="!$v.surname.alpha">
                Фамилия должна содержать только буквы (русские)
                </template>
            </span>
        </div>
        <div class="user-info-input">
            <span>Имя*</span>
            <input type="text" class="name" placeholder="Введите имя" v-model="name">
            <span class="error-msg" v-if="$v.name.$error">
                <template v-if="!$v.name.maxLength">
                Длина имени не должна превышать {{ $v.name.$params.maxLength.max }} символов
                </template>
                <template v-else-if="!$v.name.minLength">
                Длина имени должна превышать {{ $v.name.$params.minLength.min }} символа
                </template>
                <template v-else-if="!$v.name.required">
                Имя обязательно для заполнения
                </template>
                <template v-else-if="!$v.name.alpha">
                Имя должно содержать только буквы (русские)
                </template>
            </span>
        </div>
        <div class="user-info-input">
            <span>Email</span>
            <input type="email" class="email" placeholder="Введите Email" v-model="emails">
            <span class="error-msg" v-if="$v.emails.$error">
                <template v-if="!$v.emails.email">
                    Введите корректный email адрес
                </template>
                <!-- <template v-else>
                    Поле email обязательно для заполнения
                </template> -->
            </span>
        </div>
        <div class="user-info-input">
            <span>Дата рождения*</span>
            <input type="text" class="birthday" placeholder="Введите дату рождения" v-model="birthday">
            <span class="error-msg" v-if="$v.birthday.$error">
                <template v-if="!$v.birthday.validDate">
                    Введите корректную дату рождения в формате DD.MM.YYYY
                </template>
            </span>
        </div>
        <div class="user-info-input">
            <span>Номер телефона*</span>
            <input type="tel" class="phone"  placeholder="Введите номер телефона" v-model="phone">
            <span class="error-msg" v-if="$v.phone.$error">
                <template v-if="!$v.phone.required">
                    Пожалуйста, заполните поле номера телефона
                </template>
                <template v-else-if="!$v.phone.minLength">
                    Номер телефона должен содержать {{ $v.phone.$params.minLength.min }} символов
                </template>
                <template v-else-if="!$v.phone.maxLength">
                    Номер телефона должен содержать {{ $v.phone.$params.maxLength.max }} символов
                </template>
                <template v-else-if="!$v.phone.alpha">
                    Номер телефона должен начинать на 7 и содержать 11 символов
                </template>
                <!-- <template v-if="!$v.birthday.validDate">
                    Введите корректную дату рождения в формате DD.MM.YYYY
                </template> -->
            </span>
        </div>
        <div class="checkbox">
            <p>Пол:</p>   
            <input name="animal" type="radio" v-model="selectedSex" value="Женский">
            <label>Жен.</label><br>
            <input name="animal" type="radio" v-model="selectedSex" value="Мужской">
            <label>Муж.</label><br>
        </div>
        
        <div class="buttons">
            <button class="prev-card" disabled>
                Назад
            </button>
            <button class="next-card" @click.prevent="checkValidate()">
                Вперед
            </button>
        </div>
    </div>
</template>

<script>
// import useVuelidate from '@vuelidate/core'
// import { required, email } from '@vuelidate/validators'
import { required, maxLength, email, numeric, minLength } from 'vuelidate/lib/validators';
import moment from 'moment';

export default {
    props: ['about'],
    data() {
        return {
        name: null,
        surname: null,
        birthday: null,
        emails: null,
        phone: null,
        selectedSex: null,
        currentCard: 1,
        };
    },
    validations: {
        birthday: {
        required,
        validDate: val => moment(val, 'DD.MM.YYYY', true).isValid(),
        },
        name: {
        required,
        maxLength: maxLength(15),
        minLength: minLength(2),
        alpha: val => /^[а-яё]*$/i.test(val),
        },
        surname: {
            required,
            maxLength: maxLength(30),
            minLength: minLength(2),
            alpha: val => /^[а-яё]*$/i.test(val),
        },
        emails: {
            email,
        },
        phone: {
            required,
            minLength: minLength(11),
            maxLength: maxLength(11),
            alpha: val => /^(?!\(.*\).*\-\-.*$)(?!\(.*\).*\-$)(7[0-9]{10})$/.test(val)
        }
    },
    methods: {
        checkValidate() {
            this.$v.surname.$touch();
            this.$v.name.$touch();
            this.$v.emails.$touch();
            this.$v.birthday.$touch();
            this.$v.phone.$touch();
            let vm = this;
            if (this.$v.surname.$invalid === false && this.$v.name.$invalid === false && this.$v.birthday.$invalid === false && this.$v.phone.$invalid === false) {
                vm.$emit('currentCard', vm.currentCard)
                let obj = {
                    surname: null,
                    name: null,
                    birthday: null,
                    phone: null,
                    emails: null,
                    sex: null,
                };
                obj.surname = this.$v.surname.$model;
                obj.name = this.$v.name.$model;
                obj.birthday = this.$v.birthday.$model;
                obj.phone = this.$v.phone.$model;
                obj.emails = this.$v.emails.$model;
                obj.sex = this.selectedSex;
                vm.$store.commit('saveMainInfo', obj)
            }
        },
    },
    mounted() {
        if (this.$store.state.mainInfo !== null) {
            this.surname = this.$store.state.mainInfo.surname;
            this.name = this.$store.state.mainInfo.name;
            this.birthday = this.$store.state.mainInfo.birthday;
            this.emails = this.$store.state.mainInfo.emails;
            this.phone = this.$store.state.mainInfo.phone;
            this.selectedSex = this.$store.state.mainInfo.sex;
        }
    }
}
</script>

<style lang="scss">
    .error-msg {
        color: red;
        font-weight: 600;
    }

    .user-info {
        &-input {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
            input {
                max-width: 400px;
                outline: none;
                border: 1px solid gray;
                border-radius: 10px;
                padding: 10px;
            }
        }
        .checkbox {
            margin-bottom: 30px;
        }
    }
</style>