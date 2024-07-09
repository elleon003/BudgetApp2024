<template>
  <button @click="openPlaidLink">Connect Bank Account</button>
</template>

<script>
import { PlaidLink } from 'vue-plaid-link';
import directus from '@/services/directus';

export default {
  components: { PlaidLink },
  data() {
    return {
      plaidLinkHandler: null,
    };
  },
  mounted() {
    this.initPlaidLink();
  },
  methods: {
    initPlaidLink() {
      this.plaidLinkHandler = Plaid.create({
        token: 'PLAID_LINK_TOKEN', // Get this from your backend
        onSuccess: this.handleOnSuccess,
        onExit: this.handleOnExit,
        onEvent: this.handleOnEvent,
      });
    },
    openPlaidLink() {
      this.plaidLinkHandler.open();
    },
    async handleOnSuccess(public_token, metadata) {
      try {
        const response = await fetch('/api/plaid/exchange-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ public_token, metadata }),
        });
        const data = await response.json();
        await this.storePlaidData(data);
      } catch (error) {
        console.error('Error exchanging token:', error);
      }
    },
    handleOnExit(err, metadata) {
      // Handle exit
    },
    handleOnEvent(eventName, metadata) {
      // Handle events
    },
    async storePlaidData(data) {
      try {
        await directus.items('plaid_accounts').createOne({
          access_token: data.access_token,
          item_id: data.item_id,
          user_id: this.$root.$data.userId, // Assuming you store user ID in root instance
        });
      } catch (error) {
        console.error('Error storing Plaid data:', error);
      }
    },
  },
};
</script>
