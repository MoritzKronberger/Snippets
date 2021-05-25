<template>
    <body>
        <section v-for="post in posts" :key="post.id" >
            <Post :post="post" />
        </section>
    </body>
</template>

<script>
import Post from './Post.vue'
import { mapState } from 'vuex'
export default {
    name: 'Posts',
    components: {Post},
    computed:
    { ...mapState({posts: 'posts'}),
    },
    
}
</script>