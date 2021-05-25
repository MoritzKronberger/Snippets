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
                <input class="input" v-model="post.comment.message" type="text">
                <Button label="comment" btn_class="small" @click="addComment"/>
            </div>
        </section>
    </body>
</template>

<script>
import { mapState } from 'vuex'
import { mapFields  } from 'vuex-map-fields'
import Button from '../button.vue'
export default {
    name: 'Post',
    data: 
    function () 
    { return { active_id: false 
             }
    },
    props:{post: Object},
    components: {Comments, Button, Subcomments},
    computed:
    {   ...mapState({
        post: 'post_object',

        vis_Comment()
        {return this.active_id !== true ? 'hidden' : 'content post comment'}
    }),
        ...mapFields ([ 'new_comment']),
    },
    methods:
    { addComment() {this.$store.commit('addComment')}

    }
}
</script>