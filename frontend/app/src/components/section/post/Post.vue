<template>
    <body>
        <section class="content post">
            <h4>{{post.title}}</h4>
            <p>{{post.category}}</p>
            <p>{{post.content}}</p>  
            <p>{{post.lang_id}}</p>  
            <Button label="view / collapse" btn_class="addButton" @click="setActive"/>
            <div :class="vis_Comment">
                <div >
                     <!-- comments section -->   
                </div>
                <input class="input" v-model="post.comment" type="text">
                <Button label="comment" btn_class="small" @click="addComment"/>
            </div>
        </section>
    </body>
</template>

<script>
import { mapState } from 'vuex'
import { mapFields  } from 'vuex-map-fields'
import Button from '../../Button.vue'
export default {
    name: 'Post',
    data: 
    function () 
    { return { active_id: false 
             }
    },
    props:{post: Object},
    components: {Button},
    computed:
    {   ...mapState({
        post: 'posts',

        vis_Comment()
        {return this.active_id !== true ? 'hidden' : 'content post'}
    }),
        ...mapFields ([ 'post']),
    },
    methods:
    { addComment() {this.$store.commit('addComment')},
      setActive() {this.active_id = !this.active_id },
    }
}
</script>