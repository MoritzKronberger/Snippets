<template>
<Form />
<Posts />
</template>

<script>
import Form from './components/section/form/Form.vue'
import Posts from './components/section/post/Posts.vue'
export default {
  name: 'App',
  components: {
    Form,
    Posts,
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
  &.comment
  { margin-left: 0%;
    width: 50%;
    font-size: medium;
  }
  &.post
  { border: 1px solid gray;
    border-radius: 10px;
    font-size: medium;
  }
  &.form
  { border: 2px solid #A0DEE2;
    border-radius: 10px;
    margin-bottom: 10%;
    font-size: small;
  }
}

.button 
{ background-color: #A0DEE2;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 10px;

  &.addButton {
    font-size: 25px;
    margin-left: 25%;
    margin-bottom: 2.5%;
  }

  &.medium {
    font-size: 20px;

  }

  &.small {
    font-size: 15px;
    margin-right: 2%;
  }
}

.input
{ width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 15px;
  &.code 
  { height: 300px;
  } 

  &.languages 
  { width: 20%;
    border: 0;
    padding: 0 5%;
    margin: 0 5px;
    float: left;
  } 
}

</style>
