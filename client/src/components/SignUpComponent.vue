<template>
  <form @submit.prevent="signUp">
    <h2>Sign Up</h2>
    <div id="line"></div>
    <input type="text" v-model="state.username" placeholder="Username">
    <input type="email" v-model="state.email" placeholder="Email">
    <input type="password" v-model="state.password" placeholder="Password">
    <button type="submit">Sign Up</button>
    <a @click="switchToLogin">Login</a>
  </form>
</template>

<script>
import { reactive } from 'vue';
import axios from "axios";
import store from '../store/';

export default {
  name: 'LoginComponent',
  setup(props, ctx) {
    const state = reactive({
      username: '',
      email: '',
      password: ''
    });

    function switchToLogin() {
      ctx.emit('switch-to-login');
    }

    async function signUp() {
      const params = new URLSearchParams();
      params.append('username', state.username);
      params.append('email', state.email);
      params.append('password', state.password);

      const response = await axios.post('/api/signup', params);

      await store.dispatch('User/setUser', response.data);
    }

    return {
      state,
      switchToLogin,
      signUp
    }
  }
}
</script>

<style lang="sass" scoped>
form
  position: absolute
  display: flex
  flex-direction: column
  left: 50%
  top: 50%
  -webkit-transform: translate(-50%, -50%)
  transform: translate(-50%, -50%)
  background-color: white
  padding: 100px 25px
  border-radius: 10px

  h2
    text-align: center
    font-size: 3em
    margin: 50px 0px 0px 0px
    text-transform: uppercase
    color: $primary-color

  #line
    position: relative
    width: 65px
    height: 3px
    left: 50%
    top: 25px
    -webkit-transform: translate(-50%, 0%)
    transform: translate(-50%, 0%)
    background-color: gray
    margin-bottom: 65px

  input
    width: 450px
    height: 45px
    font-family: Lato
    font-size: 1.25em
    border-radius: 2.5px
    border: 1px solid #333333
    color: black
    padding: 0px 15px
    margin: 0px 150px 20px 150px

    @media (max-width: 500px)
      width: 300px

    @media (max-width: 400px)
      width: 250px

    &::placeholder
      color: #333333

    &:focus
      border-color: black

  button
    position: relative
    width: 185px
    height: 50px
    left: 50%
    -webkit-transform: translate(-50%, 0%)
    transform: translate(-50%, 0%)
    text-align: center
    font-family: Lato
    font-size: 1.4em
    background: none
    border: 2px solid $primary-color
    margin-top: 25px

    @media (max-width: 400px)
      width: 150px

    &:hover
      cursor: pointer
      -webkit-animation-name: formButton
      animation-name: formButton
      -webkit-animation-duration: .5s
      animation-duration: .5s
      background: $primary-color
      color: white

    @-webkit-keyframes formButton
      0%
        background: none
      100%
        background: $primary-color

    @keyframes formButton
      0%
        background: none
      100%
        background: $primary-color

  a
    margin: 25px auto
    font-size: 1.2em

    &:hover
      cursor: pointer
      text-decoration: underline
</style>