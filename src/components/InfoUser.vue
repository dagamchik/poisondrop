<template>
    <div class="user-info">
        <div class="user-info-input">
            <span>Образование*</span>
            <select v-model="selectedEducation">
                <option disabled value="">Выберите один из вариантов</option>
                <option v-for="(item, index) in education" :key="index">{{item}}</option>
            </select>
        </div>
        <div class="user-info-input">
            <span>Владение фреймворками(Вы можете выбрать несколько вариантов зажав <b>Ctrl(или Command)+Элемент</b>)</span>
            <select id="select-1" class="field_select" name="technology" multiple v-model="selectedFrameworks" style="width: 200px; height: 90px;">
                <option v-for="(item, index) in frameworks" :key="index">{{item}}</option>
            </select>
        </div>
        <div class="checkbox">
            <input type="checkbox" id="sms" value="Да" v-model="checkedSms">
            <label for="sms">Смс оповещения</label>
        </div>
        <div class="error" style="color: red; margin-bottom: 20px;" v-if="error == true">Выберите образование</div>
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
           education: ['Среднее', 'Средне-специальное', 'Неоконченное высшее', 'Бакалавр', 'Магистрант', 'Аспирант'],
           selectedEducation: '',
           frameworks: ['Vue', 'React', 'Angular', 'Svelte', 'Ember.js'],
           selectedFrameworks: [],
           checkedSms: null,
           currentCard: 2,
           error: false,
        };
    },
    methods: {
        checkValidate() {
            if (this.selectedEducation.length > 0) {
                this.$emit('nextCard', this.currentCard)
                let obj = {
                    education: null,
                    frameworks: null,
                    checkedSms: null,
                }
                obj.education = this.selectedEducation;
                obj.frameworks = this.selectedFrameworks;
                obj.checkedSms = this.checkedSms;
                this.$store.commit('educationInfo', obj)
            } else {
                this.error = true;
            }
        },
        backCard() {
            this.$emit('backCard', this.card)
        }
    },
    mounted() {
        if (this.$store.state.educationInfo !== null) {
            this.error = false;
            this.selectedEducation = this.$store.state.educationInfo.education;
            this.selectedFrameworks = this.$store.state.educationInfo.frameworks;
            this.checkedSms = this.$store.state.educationInfo.checkedSms;
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