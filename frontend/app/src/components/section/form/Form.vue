<template>
    <body>
        <div>
            <Button label="add Post" btn_class="addButton" @click="setActive"/>
            <section>
                <form>
                    <p>Select Language</p>
                    <div>
                        <!-- Input For Loop - Language -->
                    </div>
                    <div>
                        <input class="input" autofocus="autofocus" placeholder="title"/>
                        <textarea class="input code" placeholder="code input"/>
                        <input class="input" placeholder="add or create new category"/>
                    </div>
                    <!-- submit new post -->
                    <Button label="submit" btn_class="medium" @click="submitPost"/>
                </form>
            </section>
        </div>
    </body>
</template>
<script>
import Button from '../../Button.vue'
export default {
  name: 'Form',
  components: {Button}
}
</script>
<style lang="scss" scoped>
.input{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 15px;
  &.code 
  { 
    height: 300px;
  } 

  &.languages {
  width: 20%;
  border: 0;
  padding: 0 5%;
  margin: 0 5px;
  float: left;
  } 
}
</style>