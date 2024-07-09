<template>
  <div>
    <h2>Connected Bank Accounts</h2>
    <ul>
      <li v-for="account in plaidAccounts" :key="account.id">
        {{ account.institution_name }}
        <span>Last synced: {{ formatDate(account.last_synced) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import directus from '@/services/directus';

export default {
  data() {
    return {
      plaidAccounts: [],
    };
  },
  async mounted() {
    await this.fetchPlaidAccounts();
  },
  methods: {
    async fetchPlaidAccounts() {
      try {
        const response = await directus.items('plaid_accounts').readByQuery({
          filter: { user_id: { _eq: this.$root.$data.userId } },
        });
        this.plaidAccounts = response.data;
      } catch (error) {
        console.error('Error fetching Plaid accounts:', error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
  },
};
</script>
