<template>
  <button @click="openPlaidLink">Connect Bank Account</button>
</template>

<script>
import { PlaidLink } from 'vue-plaid-link';

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
        const response = await this.$axios.post('/api/plaid/exchange-token', {
          public_token,
          metadata,
        });
        await this.storePlaidData(response.data);
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
        await this.$axios.post('/api/directus/items/plaid_accounts', {
          access_token: data.access_token,
          item_id: data.item_id,
          user_id: this.$store.state.user.id,
        });
      } catch (error) {
        console.error('Error storing Plaid data:', error);
      }
    },
  },
};
</script>
