<template>
  <div class="notification-container">
    <div class="notification-actual-content">
      <h3>{{notification.title}}</h3>
      <div>{{notification.description}}</div>
    </div>
    <div class="actions">
      <div class="action" v-for="action in notification.actions" v-on:click="() => action.callback()">
        {{action.title}}
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Notification",
        props: ['notification']
    }
</script>

<style scoped lang="scss">
  $radius: 10px;
  $border-color: #c8c7cc;

  .notification-container {
    position: relative;
    background-color: white;
    border-radius: $radius;
    min-width: 40vh;

    .notification-actual-content {
      padding: 30px;
    }

    .actions {
      display: flex;
      border-top: 1px solid $border-color;

      .action {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        cursor: pointer;
        color: #0076ff;
        border-right: 1px solid $border-color;

        &:first-of-type {
          border-bottom-left-radius: $radius;
        }

        &:last-of-type {
          font-weight: bold;
          border-bottom-right-radius: $radius;
          border-right-color: transparent;
        }

        &:hover {
          background-color: #e2e2e2;
        }
      }
    }
  }
</style>
