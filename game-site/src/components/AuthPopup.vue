<template>
    <div class="glasses-block auth-popup">
      <div class="wrapper inset-auth-popup">
        <slot></slot>
        <transition name="slide">
          <div class="login">
            <p v-if="entryError">{{ entryError }}</p>
            <label for="username">SIGN IN, USING YOUR ACCOUNT NAME</label>
            <input type="text" :class="{ invalid: validEmail }" v-model="username" name="username" id="username" />
            <label for="password">PASSWORD</label>
            <input type="password" :class="{ invalid: validPass }" v-model="password" name="password" id="password" />
            <button class="button-gradient-hover entry-button" type="button" @click="login">Войти</button>
            <button type="button" @click="logOut">Выйти</button>
          </div>
        </transition>
        <transition name="slide">
          <div class="code" v-if="code">
            <input type="text" v-model="codeInput" name="codeInput" id="codeInput" />
            <button type="button" @click="enterCode">Ввести код</button>
          </div>
        </transition>
      </div>
    </div>

</template>
  
<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const username = ref('');
const password = ref('');
const codeInput = ref('')
const entryError = ref('');
const validEmail = ref(false);
const validPass = ref(false);
const code = computed(()=> store.getters['login/getGuardCode'])
console.log(store.getters)


async function login() {
  if (username.value !== '' && password.value !== '') {
    await store.dispatch('login/logOn', { username: username.value, password: password.value });
    console.log(code)
    await store.dispatch('login/loggedOn');
    await store.dispatch('auth/fetchUser');
  } else {
    validEmail.value = username.value === '';
    validPass.value = password.value === '';
    entryError.value = 'Заполните обязательные поля';
  }
}

async function logOut() {
  await store.dispatch('logout/logout');
  store.commit('auth/resetUser');
}

async function enterCode() {
  await store.dispatch('login/steamGuard', codeInput.value);
}
</script>
  
<style lang="scss" scoped>
@import '@/assets/components-style/auth_popup.scss';
@import '@/assets/main.scss';

.inset-auth-popup {
  @include center-align-col;
  position: relative;
  width: 50%;
  height: 50%;
  border-radius: 20px 20px 20px 20px;
  margin-top: 2vh;

  .login {
    @include center-align-col;
    align-items: start;
    gap: 10px;
    width: 60%;
    height: 80%;

    .entry-button {
      width: 100%;
    }

    input {
      font:$font-regular;
      padding-left: 10px;
      width: 100%;
      height: 30px;
    }
  }
}
</style>
  