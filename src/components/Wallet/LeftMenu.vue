<template>
<div class="appLeftCol" style="padding-right: 0px;">
    <div class="mainMenu">
        <ul class="sidebar-nav">
            <li v-bind:class="{active : (currentLeftMenu == 'index')}">
                <router-link to="/wallet">
                    <i class="bticon bticon-doc-text"></i>
                    <span class="ng-binding">我的钱包</span>
                </router-link>
            </li>
            <li v-bind:class="{active : (currentLeftMenu == 'assets')}">
                <router-link to="/assets">
                    <i class="bticon bticon-right-open"></i>
                    <span class="ng-binding">资产</span>
                </router-link>
            </li>
            <li v-bind:class="{active : (currentLeftMenu == 'send')}">
                <router-link to="/send">
                    <i class="bticon bticon-forward-outline"></i>
                    <span class="ng-binding">发送</span>
                </router-link>
            </li>
            <li v-bind:class="{active : (currentLeftMenu == 'receive')}">
                <router-link to="/receive">
                    <i class="bticon bticon-reply-outline"></i>
                    <span class="ng-binding">接收</span>
                </router-link>
            </li>
            <li v-bind:class="{active : (currentLeftMenu == 'settings')}" style="display:none;">
                <router-link to="/settings">
                    <i class="bticon bticon-cog"></i>
                    <span class="ng-binding">设置</span>
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'left_menu',
  computed: mapGetters([
    'currentLeftMenu'
  ])
}

</script>
