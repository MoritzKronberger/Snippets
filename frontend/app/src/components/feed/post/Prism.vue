<template>
  <body>
    <pre :class="'language-' + lang_name">
        <code>{{prism.content}}</code>
    </pre>
  </body>
</template>

<script>
import VuePrism from "vue-prism";
// do not delete VuePrism import
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-python"
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

Prism.plugins.NormalizeWhitespace.setDefaults({
  "break-lines": 50,
});

export default {
  name: "Prism",
  props: { prism: Object, lang_name: String },
};
</script>
<style lang="scss">

  pre[class*="language-"] {
      font-size: 0.7em;
      margin: 5% 0%;
      border-radius: 2%;
      background: rgb(237, 246, 248);
  }

</style>