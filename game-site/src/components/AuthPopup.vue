<template>
    <div class="glasses-block auth-popup">
      <div class="inset-auth-popup">
        <closeButtonVue text="CLOSE" @click="handlePopup"/>
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
import closeButtonVue from '@/componentUI/closeButton.vue';

const { dispatch, commit, getters } = useStore();
const username = ref('');
const password = ref('');
const codeInput = ref('')
const entryError = ref('');
const validEmail = ref(false);
const validPass = ref(false);
const code = computed(()=> getters['login/getGuardCode'])


const handlePopup = () => {
  commit('popupState/toggleIsAuthPopup')
} 


async function login() {
  if (username.value !== '' && password.value !== '') {
    await dispatch('login/logOn', { username: username.value, password: password.value });
    console.log(code)
    await dispatch('login/loggedOn');
    await dispatch('auth/fetchUser');
  } else {
    validEmail.value = username.value === '';
    validPass.value = password.value === '';
    entryError.value = 'Заполните обязательные поля';
  }
}

async function logOut() {
  await dispatch('logout/logout');
  commit('auth/resetUser');
}

async function enterCode() {
  await dispatch('login/steamGuard', codeInput.value);
}
</script>
  
<style lang="scss" scoped>
@import '@/assets/mixin.layout.scss';
@import '@/assets/components-style/auth_popup.scss';
</style>
  