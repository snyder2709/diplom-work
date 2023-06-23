<template>
  <div class="glasses-block auth-popup">
    <div class="wrapper inset-auth-popup">
      <slot></slot>
      <transition name="slide">
        <div class="login" v-if="!setCode">
          <p v-if="entryError">{{ entryError }}</p>
          <input
            type="text"
            :class="{ invalid: validEmail }"
            v-model="username"
            name="username"
            id="username"
          />
          <input
            type="password"
            :class="{ invalid: validPass }"
            v-model="password"
            name="password"
            id="password"
          />
          <button type="button" @click="login">Войти</button>
          <button type="button" @click="logOut">Выйти</button>
        </div>
      </transition>
      <transition name="slide">
        <div class="code" v-if="setCode">
          <input type="text" v-model="code" name="code" id="code" />
          <button type="button" @click="enterCode">Ввести код</button>
        </div>
      </transition>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore()

  const username = ref('');
  const password = ref('');
  const code = ref('');
  const setCode = ref(false);
  const entryError = ref('');
  const validEmail = ref(false);
  const validPass = ref(false);

  
  async function login() {
    if (username.value !== '' && password.value !== '') {
      await store.dispatch('loginUser',{ username: username.value, password: password.value });
      setCode.value = true;
      await store.dispatch('fetchUser');
    } else {
      validEmail.value = username.value === '';
      validPass.value = password.value === '';
      entryError.value = 'Заполните обязательные поля';
    }
  }
  
  async function logOut() {
    await store.dispatch('logout');
   store.commit('resetUser');
  }
  
  async function enterCode() {
    await store.dispatch('steamGuard',code.value);
  }
  </script>
  
  <style lang="scss" scoped>
    @import '@/assets/components-style/auth_popup.scss';
    .inset-auth-popup {
      width: 50%;
      height: 50%;
      border-radius: 20px 20px 20px 20px;
      margin-top: 2vh;
      .login{
       @include center-align-col;
       gap: 10px;
      }
    }
  </style>
  