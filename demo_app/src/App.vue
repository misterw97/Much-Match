<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="js">
    import Vue from "vue";
    import VueSocketIOExt from 'vue-socket.io-extended';
    import io from 'socket.io-client';

    const socket = io(process.env.VUE_APP_WS_BASE);
    Vue.use(VueSocketIOExt, socket);

    export default Vue.extend({
        name: "App",
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            customEmit: function (val) {
                console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
            }
        },
        watch: {
            $route: {
                handler: (to, from) => {
                    document.title =
                        to.meta.title ||
                        "MuchMatch: Swiping Behaviour Study [EPFL Experience Design]";
                },
                immediate: true
            }
        }
    });
</script>
