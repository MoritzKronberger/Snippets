<template>
    <body>
        <section class="content post">
            <h4>{{post.title}}</h4>
            <p>Date: {{post.date}}</p>
            <p>Written by: {{post.author}}</p>
            <p>Language: {{lang[post.lang_id].name}}</p>  
            <p>{{post.category}}</p>
            <p>{{post.content}}</p>  
            <Button label="view / collapse" btn_class="small" @click="setActive()"/>

            <div :class="vis_Comment">
                 <div v-for="comments in post.comment" :key="comments.id">
                        <Comments :comments="comments"/>
                 </div>
            <input class="input" v-model="new_comment" type="text">
            <Button label="comment" btn_class="small" @click="addComment()"/>
            <Button :label="'Likes: ' + post.likes" btn_class="small" @click="addLike()"/>
            </div>
        </section>
    </body>
</template>

<script>
import { mapState } from 'vuex'
import { mapFields  } from 'vuex-map-fields'
import Comments from './Comments.vue'
import Likes from './Likes.vue'
import Button from '../../Button.vue'
export default {
    name: 'Post',
    props:{post: Object},
    components: {Comments, Likes, Button},
    computed:
    { vis_Comment()
      { return this.post.id !== this.active_id ? 'hidden' : ''
      },
      ...mapState({lang: 'lang_object'}),
      ...mapFields ({new_comment: 'comment.new_comment', active_id: 'active_id'}),
    },
    methods:
    { addComment() 
      { this.$store.commit('addComment', this.post.id);
        this.new_comment = '';
      },
     

     setActive() 
     { return this.post.id !== this.active_id ? 
       this.active_id=this.post.id : this.active_id=null
     },

     addLike()
     { this.$store.commit('addLike', this.post.id) },

    }
}
</script>