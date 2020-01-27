import axios from 'axios';
import toggleIcon from './toggle-icon.js';

export default {
    name: 'form-edit',
    props: {
        contact: Object
    },
    data() {
      return {
        isLoading: false,
        isDisabled: false,
        notice: null,
        name: this.contact.name,
        email: this.contact.email,
        summary: this.contact.summary,
        company: this.contact.summary
      }
    },
    methods: {
        editContact(event) {
          event.preventDefault();
          this.isLoading = true;
          axios({
            method: 'patch',
            url: '/api/contacts',
            data: this.formData,
            headers: {
              'X-CSRF-TOKEN': document.querySelector("meta[name=csrf-token]").content
            }
          }).then((response) => {
            if (response.data.status == 'ok') {
              this.notice = 'Contact updated';
              this.isDisabled = true;
              this.$emit('contact-updated');
            } else {
              this.notice = response.data.message;
            };
            this.isLoading = false;
          })
        },
    },
    computed: {
      formData() {
        return {
          name: this.name,
          email: this.email,
          company: this.company,
          summary: this.summary,
          id: this.contact.id
        }
      }
    },
    template: `
        <form class="p-md" @submit="editContact">
          <h2 class="mb-md h2">Edit contact</h2>
          <p v-if="notice" class="notice">{{ notice }}</p>
          <div class="field field--required">
            <label>Name</label>
            <input type="text" placeholder="type here" required v-model="name" />
          </div>
          <div class="field field--required">
            <label>Email</label>
            <input type="email" placeholder="type here" required v-model="email" />
          </div>
          <div class="field field--required">
            <label>Company</label>
            <input type="text" placeholder="type here" v-model="company" />
          </div>
          <div class="field">
            <label>Summary</label>
            <textarea rows="3" v-model="summary"></textarea>
          </div>
          <button
            class="btn mt-sm"
            :class="{'btn--loading' : isLoading, 'btn--disabled' : isDisabled}">Edit
          </button>
        </form>
    `,
};
