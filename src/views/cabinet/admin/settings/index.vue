<template>
    <div class="settings">
        <div class="settings--wrapper">
            <div class="settings--header">
                <div class="settings--header--title">
                    <h2>Settings</h2>
                </div>
            </div>
            <el-scrollbar height="100vh">

                <section class="settings--box">
                    <div class="settings--box--top">
                        <div class="settings--box--top-title">
                            <h3>Notifications</h3>
                        </div>
                        <div class="settings--box--top--list">
                            <ul>
                                <li><h4>Allow desktop notifications</h4><el-switch v-model="val" /></li>
                                <li><h4>Allow email notifications</h4><el-switch v-model="val1" />  </li>
                            </ul>
                        </div>
                    </div>
                    <span class="settings--bg"></span>
                    <div class="settings--box--bottom">
                        <div class="settings--box--bottom-title">
                            <h3>Language preference</h3>
                        </div>
                        <div class="settings--box--bottom-list">
                            <h4>Select language</h4>
                            <div class="settings--box--bottom-list-select">
                                <el-select v-model="value" class="m-2" placeholder="Select" size="large">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                        </div>
                    </div>
                </section>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
const val = ref(false);
const val1 = ref(false)
const value = ref('')

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
</script>