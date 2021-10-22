require('./bootstrap');

 //window.Vue = require('vue');
 window.moment = require('moment');
 window.Swal = require('sweetalert2/dist/sweetalert2.js');
 //window.NewDatePicker = require('@mathieustan/vue-datepicker');
 //window.VCalendar = require('v-calendar');
 //window.datepicker = require('vuejs-datepicker');


// import dependecies tambahan
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import Axios from 'axios';
import VueMoment from 'vue-moment';
import Datepicker from 'vuejs-datepicker';
import NewDatePicker from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
//import VCalendar from 'v-calendar';
import Swal from "sweetalert2";
//import VueSweetalert2 from 'vue-sweetalert2';
//import moment from 'moment';

Vue.use(VueRouter,VueAxios,Axios,moment,VueMoment, Datepicker, Swal, NewDatePicker);
//Vue.use(VCalendar, {componentPrefix: 'vc'});
Vue.use(NewDatePicker, {component: '@mathieustan/vue-datepicker'});

// import file yang dibuat tadi
import App from './components/App.vue';
import Create from './components/Create.vue';
import Read from './components/Read.vue';
import Update from './components/Update.vue';
import Upload from './components/upload.vue';

// membuat router
const routes = [
    {
        name: 'Read',
        path: '/',
        component: Read
    },
    {
        name: 'Create',
        path: '/create',
        component: Create
    },
    {
        name: 'Update',
        path: '/detail/:id',
        component: Update
    },
    {
        name: 'Upload',
        path: '/upload',
        component: Upload
    }
]

const router = new VueRouter({ mode: 'hash', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount("#app");