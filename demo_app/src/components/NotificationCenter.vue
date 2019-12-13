<template>
  <div class="notification-centre-container" :class="{active: notification}">
    <notification v-if="notification" :notification="notification"/>
  </div>
</template>

<script>
    import Notification from "@/components/Notification";
    import {EventBus} from '@/event-bus';

    export default {
        name: "NotificationCenter",
        components: {Notification},
        data() {
            return {
                notification: null,
            }
        },
        mounted() {
            EventBus.$on('notification', notification => this.notification = notification);
            EventBus.$on('dismiss-notification', () => this.notification = null);
        }
    }
</script>

<style scoped lang="scss">
  .notification-centre-container {
    background-color: #4a5c5fa3;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;

    &.active {
      visibility: visible;
    }
  }
</style>
