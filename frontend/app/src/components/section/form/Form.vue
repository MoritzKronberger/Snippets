<template>
    <body>
        <div>
            <Button label="add Post" btn_class="addButton" @click="setActive"/>
            <section :class="vis_FormPost(true)">
                <form>
                    <p>Select Language</p>
                    <div>
                        <!-- Input For Loop - Language -->
                    </div>
                    <div>
                        <input v-model="post.title" class="input" autofocus="autofocus" placeholder="title"/>
                        <textarea v-model="post.content" class="input code" placeholder="code input"/>
                        <input v-model="post.category" class="input" placeholder="add or create new category"/>
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
import { mapGetters, mapState } from 'vuex'
import { mapFields  } from 'vuex-map-fields'
export default {
  name: 'Form',
  components: {Button},
  computed:
  { //...mapState({}),
    ...mapGetters(['vis_FormPost']),
    ...mapFields (['section', 'post']),
  },
  methods:
  {
    setActive()
    { this.section = !this.section},

    submitPost()
    { this.$store.commit('newPost');}
  }
}
</script>
<style lang="scss" scoped>
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