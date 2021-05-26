<template>
    <body>
        <p class="content comment">{{comments.message}}</p>
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