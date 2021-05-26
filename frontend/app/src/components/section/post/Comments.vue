<template>
    <body>
        <div class="content comment">
        <p>{{comments.message}}</p>
        <p>{{comments.likes}}</p>
        <p>{{comments.author}}</p>
        <p>{{comments.date}}</p>
        </div>
    </body>
</template>

<script>
import { mapFields  } from 'vuex-map-fields'
import { mapState } from 'vuex'
export default {
    name: 'Comments',
    props:{comments: Object},
    computed:
    {   ...mapState({posts: 'post_object'}),  
        ...mapFields ([ 'new_comment']),
    },
}
</script>