<template>
    <body>
        <div>
            <Button label="add Post" btn_class="addButton" @click="setActive"/>
            <section :class="vis_FormPost(true)">
                <form>
                    <p>Select Language</p>
                    <div>
                        <section class="input languages" v-for="langs in langs" :key="langs.id" >
                            <Languages :languages="langs" @click="addLang(langs.id)" />
                        </section>
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
import Languages from './Languages'
import { mapGetters, mapState } from 'vuex'
import { mapFields  } from 'vuex-map-fields'
export default {
  name: 'Form',
  components: {Button, Languages},
  computed:
  {  ...mapState({langs: 'lang_object'}),
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
</style>