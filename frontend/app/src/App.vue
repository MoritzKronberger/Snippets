<template>
  <Form />
</template>

<script>
import Form from './components/section/form/Form.vue'
export default {
  name: 'App',
  components: {
    Form,
  }
}
</script>
<style lang="scss">
.hidden
{ display: none;
}

html, body
{ height:      100%;
  font-size:   $font-size-base !important;
  font-family: $font-family-sans;
  background-color: white;
}

.content 
{ padding: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.5%;
  &.form
  { border: 2px solid #A0DEE2;
    border-radius: 10px;
    margin-bottom: 10%;
    font-size: small;
  }
}

</style>
