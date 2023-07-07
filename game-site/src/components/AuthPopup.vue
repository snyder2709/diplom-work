<template>
  <div class="glasses-block auth-popup">
    <div class="inset-auth-popup">
      <closeButtonVue text="CLOSE" @click="handlePopup" />
      <transition name="slide">
        <div class="login">
          <p v-show="entryError">{{ entryError }}</p>
          <label for="username">SIGN IN, USING YOUR ACCOUNT NAME</label>
          <input type="text" :class="{ invalid: validEmail }" v-model="username" name="username" id="username" />
          <label for="password">PASSWORD</label>
          <input type="password" :class="{ invalid: validPass }" v-model="password" name="password" id="password" />
          <button class="button-gradient-hover entry-button" type="button" @click="login">Войти</button>
        </div>
      </transition>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import closeButtonVue from '@/componentUI/closeButton.vue';

const { dispatch, commit, getters } = useStore();
const username = ref('');
const password = ref('');
const entryError = ref('');
const validEmail = ref(false);
const validPass = ref(false);


const handlePopup = () => {
  commit('popupState/toggleIsAuthPopup')
}


async function login() {
  if (username.value !== '' && password.value !== '') {
    await dispatch('login/logOn', { username: username.value, password: password.value });
    await dispatch('auth/fetchUser');
    commit('popupState/toggleIsAuthPopup');

  } else {
    validEmail.value = true;
    validPass.value = true;
    username.value === '';
    password.value === '';
    entryError.value = 'Fill in the required fields';
  }
}
</script>
  
<style lang="scss" scoped>
@import '@/assets/mixin.layout.scss';
@import '@/assets/components-style/auth_popup.scss';

p {
  color: red;
}
</style>
  