<template>
  <div>
    <br />
    Welcome ! This website gives you information about outside film shootings in Paris since 2016
    <br />
    <br />
    <router-link v-if="!isLoggedIn" to="/login"><button>Display film locations</button></router-link>
    <router-link v-if="isLoggedIn" to="/locations"><button>Display film locations</button></router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
  }
};

</script>