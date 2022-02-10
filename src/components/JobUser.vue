<template>
    <div class="user-info">
        <div class="user-info-input" v-for="input in inputs" :key="input.label">
            <label :for="input.label">{{ input.label }}</label>
            <input type="text" :id="input.label" :placeholder="input.placeholder" :value="input.value" @change="showValue($event, input.label)">
        </div>
        <div class="add-input">
            <button class="add-input-btn" @click.prevent="pushInput">Добавить поле для опыта работы</button>
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
            inputs: [
                {label: 'Опыт работы 1', placeholder: 'Работа 1', value: ''}
            ],
            currentCard: 3,
        };
    },
    methods: {
        checkValidate() {
            if (this.inputs.length > 0) {
                this.$emit('nextCard', this.currentCard);
                this.$store.commit('jobUserInfo', this.inputs)
            }
        },
        pushInput() {
            if (this.inputs.length < 5) {
                this.inputs.push({
                    label: 'Опыт работы ' + (this.inputs.length + 1),
                    placeholder: 'Работа ' + (this.inputs.length + 1),
                    value: ''
                })
            }
        },
        backCard() {
            this.$emit('backCard', this.card)
        },
        showValue($event, id) {
            // this.job.push({
            //     id,
            //     value: $event.target.value
            // })
            let result = this.inputs.filter((v) => {
                if (v.label === id) {
                    v.value = $event.target.value;
                }
            })
        }
    },
    mounted() {
        if (this.$store.state.jobInfo !== null) {
            this.inputs = this.$store.state.jobInfo;
            console.log( this.$store.state.jobInfo)
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

    .add-input {
        &-btn {
            background-color: rgb(82, 82, 167);
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 10px;
            margin-bottom: 20px;
            cursor: pointer;
            transition: .3s ease-in-out;
            &:hover {
                background-color: rgb(140, 140, 252);
            }
        }
    }
</style>