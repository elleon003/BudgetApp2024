import Vue from 'vue'
import App from './App.vue'
import directus from './services/directus'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    userId: null
  },
  async created() {
    try {
      // Check if there's an existing session
      const token = localStorage.getItem('directus_token');
      if (token) {
        // Set the token in the Directus SDK
        await directus.auth.static(token);
        
        // Fetch the current user's information
        const user = await directus.users.me.read();
        
        // Set the userId
        this.userId = user.id;
      } else {
        // If no token, redirect to login page or show login component
        // For example:
        //this.$router.push('/login');
        console.log('No active session. User needs to log in.');
      }
    } catch (error) {
      console.error('Error checking session:', error);
      // Handle error (e.g., invalid token)
      localStorage.removeItem('directus_token');
      // Redirect to login or show error message
    }
  }
}).$mount('#app')
