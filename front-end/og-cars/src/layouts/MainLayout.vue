<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> OG Cars </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Main Menu </q-item-label>

        <q-item clickable exact to="/">
          <q-item-section avatar>
            <q-icon name="drive_eta" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cars</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-show="!loggedIn" clickable exact to="/login">
          <q-item-section avatar>
            <q-icon name="key" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-show="!loggedIn" clickable exact to="/register">
          <q-item-section avatar>
            <q-icon name="person_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Register</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-show="loggedIn" clickable exact to="/account">
          <q-item-section avatar>
            <q-icon name="manage_accounts" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Account</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.com/tucamadalin99/TIC-Project"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>View Source</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUpdate } from 'vue';
import Utils from '../components/utils';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);
    let loggedIn = ref(
      Utils.getExpiringLocalStorage('jwt-auth') ? true : false
    );

    onBeforeUpdate(() => {
      loggedIn.value = Utils.getExpiringLocalStorage('jwt-auth') ? true : false;
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      loggedIn,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-toolbar {
  background-image: linear-gradient(to right, #003d7a, rgb(172, 18, 18));
}
</style>
