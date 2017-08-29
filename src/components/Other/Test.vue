<template>
  <div class="test_class">
    <h1>当前黄金价格: {{ msg }}</h1>
    <p>{{ pushIndex }}</p>
    <p>{{ $t("message.hello") }}</p>
    <router-link to="/user">{{ $t("click") }}</router-link>
    <p>
      选择语言:
      <select @change="changeLanguage($event)">
        <option value="en">en</option>
        <option value="ja">ja</option>
      </select>
    </p>
  </div>
</template>

<script>
export default {
  name: 'test_class',
  data () {
    return {
      msg: 0
    }
  },
  computed: {
    pushIndex () {
      return this.msg + 1
    }
  },
  methods: {
    changeLanguage (event) {
      this.$i18n.locale = event.target.value
    }
  },
  created () {
    this.$socket.on('push_index', (data) => {
      this.msg = data.GOLD.current_value
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
