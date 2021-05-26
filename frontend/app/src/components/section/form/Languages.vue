<template>
    <body>
        <input class="button small" type="button" :value="languages.name">
    </body>
</template>

<script>
export default {
    name: 'Languages',
    props:{languages: Object},
}
</script>