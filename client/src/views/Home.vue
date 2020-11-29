<template>
  <h1>Goalify</h1>
  <LoginComponent style="display: none;"/>
  <MilestonesComponent id="milestones-component" :style="{ left: MilestonesPlacement + '%' }" />
  <TasksComponent id="tasks-component" :class="{ slideLeft: taskSlideLeft }" />
  <CalendarComponent id="calendar-component" :style="{ left: CalendarPlacement + '%' }" />
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
import MilestonesComponent from '../components/MilestonesComponent';
import TasksComponent from '../components/TasksComponent';
import LoginComponent from '../components/LoginComponent';
import CalendarComponent from '../components/CalendarComponent';
import { reactive, computed } from 'vue';

export default {
  name: 'Home',
  components: { MilestonesComponent, TasksComponent, LoginComponent, CalendarComponent },
  setup() {
    const state = reactive({
      currentPage: 'Tasks',
      pages: ['Milestones', 'Tasks', 'Calendar']
    });

    function changePage(side) {
      if (side == 'left') {
        let lastPage = state.pages[state.pages.length - 1];
        state.pages.pop();
        state.pages.unshift(lastPage);
      } else {
        let firstPage = state.pages[0];
        state.pages.shift();
        state.pages.push(firstPage);
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
      if (state.pages[0] == 'Tasks') {
        return "centerToLeft";
      }
    });

    const CalendarPlacement = computed(() => {
      for (let i in state.pages) {
        if (state.pages[i] == 'Calendar') {
          return (i - 1) * 100;
        }
      }
    });

    return {
      state,
      changePage,
      MilestonesPlacement,
      TasksPlacement,
      CalendarPlacement
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  position: absolute
  left: 50%
  top: 10%
  transform: translateX(-50%)
  font-size: 3em
  color: white
  z-index: 5

#milestones-component
  position: absolute
  left: -100%
  overflow: hidden

#tasks-component
  position: absolute
  overflow: hidden
  
#calendar-component
  position: absolute
  right: 100%
  overflow: hidden

.slideLeft
  animation-name: centerToLeft
  animation-duration: 3s

@keyframes centerToLeft
  0%
    left: 0%
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
