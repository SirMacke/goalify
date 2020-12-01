<template>
  <h1>Goalify</h1>
  <LoginComponent id="login-component" v-if="state.showLogin" @switch-to-sign-up="switchToSignUp" :style="{ display: loggedInCheck }"/>
  <SignUpComponent id="signup-component" v-if="state.showSignUp" @switch-to-login="switchToLogin" :style="{ display: loggedInCheck }"/>
  <div id="dark-overlay" :style="{ display: loggedInCheck }"></div>
  <main>
    <MilestonesComponent id="milestones-component" :style="{ left: MilestonesPlacement + '%' }" :class="{
      slideRightToCenter: MilestonesRightToCenter,
      slideCenterToLeft: MilestonesCenterToLeft,
      slideLeftToRight: MilestonesLeftToRight,
      slideLeftToCenter: MilestonesLeftToCenter,
      slideCenterToRight: MilestonesCenterToRight,
      slideRightToLeft: MilestonesRightToLeft
    }" />
    <TasksComponent id="tasks-component" :style="{ left: TasksPlacement + '%' }" :class="{
      slideRightToCenter: TasksRightToCenter,
      slideCenterToLeft: TasksCenterToLeft,
      slideLeftToRight: TasksLeftToRight,
      slideLeftToCenter: TasksLeftToCenter,
      slideCenterToRight: TasksCenterToRight,
      slideRightToLeft: TasksRightToLeft
    }" />
    <CalendarComponent id="calendar-component" :style="{ left: CalendarPlacement + '%' }" :class="{
      slideRightToCenter: CalendarRightToCenter,
      slideCenterToLeft: CalendarCenterToLeft,
      slideLeftToRight: CalendarLeftToRight,
      slideLeftToCenter: CalendarLeftToCenter,
      slideCenterToRight: CalendarCenterToRight,
      slideRightToLeft: CalendarRightToLeft
    }" />
  </main>
  <div class="nav" id="nav-left" v-on:click="changePage('left')">
    <i class="fas fa-chevron-left"></i>
    <p>{{ state.pages[0] }}</p>
  </div>
  <div class="nav" id="nav-right" v-on:click="changePage('right')">
    <p>{{ state.pages[2] }}</p>
    <i class="fas fa-chevron-right"></i>
  </div>
</template>

<script>
import LoginComponent from '../components/LoginComponent';
import SignUpComponent from '../components/SignUpComponent';
import MilestonesComponent from '../components/MilestonesComponent';
import TasksComponent from '../components/TasksComponent';
import CalendarComponent from '../components/CalendarComponent';
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  components: { LoginComponent, SignUpComponent, MilestonesComponent, TasksComponent, CalendarComponent },
  setup() {
    const storeData = useStore();
    const state = reactive({
      currentPage: 'Tasks',
      pages: ['Milestones', 'Tasks', 'Calendar'],
      showLogin: false,
      showSignUp: false
    });
    let milestonesPosition = 0;
    let tasksPosition = 1;
    let calendarPosition = 2;

    const loggedInCheck = computed(() => {
      if (storeData.state.user == null) {
        state.showLogin = true;
        return "flex";
      } else {
        state.showLogin = false;
        return "none";
      }
    })

    function switchToSignUp() {
      state.showLogin = false;
      state.showSignUp = true;
    }

    function switchToLogin() {
      state.showLogin = true;
      state.showSignUp = false;
    }

    function changePage(side) {
      if (side == 'left') {
        let firstPage = state.pages[0];
        state.pages.shift();
        state.pages.push(firstPage);

        setTimeout(() => {
          for(let i in state.pages) {
            if (state.pages[i] == 'Milestones') {
              milestonesPosition = i;
            } else if (state.pages[i] == 'Tasks') {
              tasksPosition = i;
            } else if (state.pages[i] == 'Calendar') {
              calendarPosition = i;
            }
          }
        }, 100);
      } else {
        let lastPage = state.pages[state.pages.length - 1];
        state.pages.pop();
        state.pages.unshift(lastPage);

        setTimeout(() => {
          for(let i in state.pages) {
            if (state.pages[i] == 'Milestones') {
              milestonesPosition = i;
            } else if (state.pages[i] == 'Tasks') {
              tasksPosition = i;
            } else if (state.pages[i] == 'Calendar') {
              calendarPosition = i;
            }
          }
        }, 100);
      }
    }

    const MilestonesPlacement = computed(() => {
      for (let i in state.pages) {
        if (state.pages[i] == 'Milestones') {
          return (i - 1) * 100;
        }
      }
    });

    const TasksPlacement = computed(() => {
      for (let i in state.pages) {
        if (state.pages[i] == 'Tasks') {
          return (i - 1) * -100;
        }
      }
    });

    const CalendarPlacement = computed(() => {
      for (let i in state.pages) {
        if (state.pages[i] == 'Calendar') {
          return (i - 1) * 100;
        }
      }
    });

    const MilestonesRightToCenter = computed(() => { if(state.pages[1] == 'Milestones' && milestonesPosition == 2) { return true } });
    const MilestonesCenterToLeft = computed(() => { if(state.pages[0] == 'Milestones' && milestonesPosition == 1) { return true } });
    const MilestonesLeftToRight = computed(() => { if(state.pages[2] == 'Milestones' && milestonesPosition == 0) { return true } });
    const MilestonesLeftToCenter = computed(() => { if(state.pages[1] == 'Milestones' && milestonesPosition == 0) { return true } });
    const MilestonesCenterToRight = computed(() => { if(state.pages[2] == 'Milestones' && milestonesPosition == 1) { return true } });
    const MilestonesRightToLeft = computed(() => { if(state.pages[0] == 'Milestones' && milestonesPosition == 2) { return true } });

    const TasksRightToCenter = computed(() => { if(state.pages[1] == 'Tasks' && tasksPosition == 2) { return true } });
    const TasksCenterToLeft = computed(() => { if(state.pages[0] == 'Tasks' && tasksPosition == 1) { return true } });
    const TasksLeftToRight = computed(() => { if(state.pages[2] == 'Tasks' && tasksPosition == 0) { return true } });
    const TasksLeftToCenter = computed(() => { if(state.pages[1] == 'Tasks' && tasksPosition == 0) { return true } });
    const TasksCenterToRight = computed(() => { if(state.pages[2] == 'Tasks' && tasksPosition == 1) { return true } });
    const TasksRightToLeft = computed(() => { if(state.pages[0] == 'Tasks' && tasksPosition == 2) { return true } });

    const CalendarRightToCenter = computed(() => { if(state.pages[1] == 'Calendar' && calendarPosition == 2) { return true } });
    const CalendarCenterToLeft = computed(() => { if(state.pages[0] == 'Calendar' && calendarPosition == 1) { return true } });
    const CalendarLeftToRight = computed(() => { if(state.pages[2] == 'Calendar' && calendarPosition == 0) { return true } });
    const CalendarLeftToCenter = computed(() => { if(state.pages[1] == 'Calendar' && calendarPosition == 0) { return true } });
    const CalendarCenterToRight = computed(() => { if(state.pages[2] == 'Calendar' && calendarPosition == 1) { return true } });
    const CalendarRightToLeft = computed(() => { if(state.pages[0] == 'Calendar' && calendarPosition == 2) { return true } });

    return {
      state,
      changePage,
      MilestonesPlacement,
      TasksPlacement,
      CalendarPlacement,
      MilestonesRightToCenter,
      MilestonesCenterToLeft,
      MilestonesLeftToRight,
      MilestonesLeftToCenter,
      MilestonesCenterToRight,
      MilestonesRightToLeft,
      TasksRightToCenter,
      TasksCenterToLeft,
      TasksLeftToRight,
      TasksLeftToCenter,
      TasksCenterToRight,
      TasksRightToLeft,
      CalendarRightToCenter,
      CalendarCenterToLeft,
      CalendarLeftToRight,
      CalendarLeftToCenter,
      CalendarCenterToRight,
      CalendarRightToLeft,
      loggedInCheck,
      switchToSignUp,
      switchToLogin
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  position: absolute
  left: 50%
  top: 5%
  transform: translateX(-50%)
  font-size: 3em
  color: white
  z-index: 5

#login-component
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  z-index: 6

#signup-component
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  z-index: 6

#dark-overlay
  position: absolute
  width: 100%
  height: 100%
  background-color: black
  opacity: 0.5
  z-index: 5

main

  #milestones-component
    position: absolute
    left: -100%
    overflow: hidden

  #tasks-component
    position: absolute
    overflow: hidden
    
  #calendar-component
    position: absolute
    left: 100%
    overflow: hidden

  .slideRightToCenter
    animation-name: rightToCenter
    animation-duration: 1s

    @keyframes rightToCenter
      0%
        left: 100%
      100%
        left: 0%

  .slideCenterToLeft
    animation-name: centerToLeft
    animation-duration: 1s

    @keyframes centerToLeft
      0%
        left: 0%
      100%
        left: -100%

  .slideLeftToRight
    animation-name: leftToRight
    animation-duration: 1s

    @keyframes leftToRight
      0%
        left: 100%
      100%
        left: 100%

  .slideLeftToCenter
    animation-name: leftToCenter
    animation-duration: 1s

    @keyframes leftToCenter
      0%
        left: -100%
      100%
        left: 0%

  .slideCenterToRight
    animation-name: centerToRight
    animation-duration: 1s

    @keyframes centerToRight
      0%
        left: 0%
      100%
        left: 100%

  .slideRightToLeft
    animation-name: rightToLeft
    animation-duration: 1s

    @keyframes rightToLeft
      0%
        left: -100%
      100%
        left: -100%

.nav
  position: absolute
  bottom: 6.5%
  color: $primary-text
  display: flex
  margin: 0px

  &:hover
    cursor: pointer

  i
    font-size: 2em
    margin: auto 

  p
    font-size: 1.75em
    font-weight: bold
    margin: -2.5px 15px 0px 15px

#nav-left
  left: 5%

#nav-right
  right: 5%
</style>
