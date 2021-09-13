<template>
  <div>
    <label v-if="content">Welcome to <b>Black Dashboard</b> - a beautiful freebie for every web developer.</label>
    <label v-else>{{content}}</label>
  </div>
</template>

<script>
  export default {
    name: 'notification-template',
    props: { 
      content: String
    }
  }
</script>
