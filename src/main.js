import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from "@primeuix/themes/aura";
import { definePreset } from '@primeuix/themes';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './assets/style.css'
import App from './components/App.vue';


const app = createApp(App);

const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                },
            }
        },
    },
});

app.use(Toast);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset ,
    }
});
app.mount('#app');


