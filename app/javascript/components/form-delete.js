import axios from 'axios';

export default {
    name: 'form-delete',
    props: {
        contact: Object,
    },
    data: () => ({
      isLoading: false,
      isDisabled: false,
      notice: null
    }),
    methods: {
        deleteContact() {
          this.isLoading = true;
          axios({
            method: 'delete',
            url: `/api/contacts`,
            data: {id: this.contact.id},
            headers: {
              'X-CSRF-TOKEN': document.querySelector("meta[name=csrf-token]").content
            }
          }).then((response) => {
            if (response.data.status == 'ok') {
              this.notice = 'Contact Deleted';
              this.isDisabled = true;
              this.$emit('contact-deleted');
            } else {
              this.notice = response.data.message;
            };
            this.isLoading = false;
          })
        },
    },
    template: `
        <div class="p-md form">
          <h2 class="mb-lg h2">Delete contact</h2>
          <p v-if="notice" class="notice">{{ notice }}</p>
          <p class="mb-md">Are you sure you want to delete contact {{ contact.name }}?</p>
          <button
            class="btn"
            :class="{'btn--loading' : isLoading, 'btn--disabled' : isDisabled}"
            @click="deleteContact">Yes
          </button>
        </div>
    `,
};
