<template>
    <body>
        <input class="button small" type="button" :value="'likes:' + posts.likes">
    </body>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Likes',
    props:{likes: Object},
    computed:
    {  ...mapState({posts: 'posts'}),
    },
}
</script>