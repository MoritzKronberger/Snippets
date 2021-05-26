<template>
    <body>
        <section class="content post">
            <h4>{{post.title}}</h4>
            <p>#{{post.category}}</p>
            <p>{{post.content}}</p>  
            <p>{{post.lang_id}}</p>  
            <Button label="view / collapse" btn_class="small" @click="setActive"/>
            <div :class="vis_Comment">
                 <div v-for="comments in post.comment" :key="comments.id">
                        <Comments :comments="comments"/>
                </div>
                <input class="input" v-model="new_comment" type="text">
                <Button label="comment" btn_class="small" @click="addComment(post.id)"/>
            </div>
        </section>
    </body>
</template>

<script>
import { mapState } from 'vuex'
import { mapFields  } from 'vuex-map-fields'
import Comments from './Comments.vue'
import Button from '../../Button.vue'
export default {
    name: 'Post',
    data: 
    function () 
    { return { active_id: false }
    },
    props:{post: Object},
    components: {Comments, Button},
    computed:
    {   ...mapState({
        posts: 'posts',

        vis_Comment()
        {return this.active_id !== true ? 'hidden' : 'content comment'}
    }),
        ...mapFields ({new_comment: 'post.comment'}),
    },
    methods:
    { addComment(post_id) 
      { this.$store.commit('addComment', post_id) },

      setActive() 
      {this.active_id = !this.active_id },
    }
}
</script>