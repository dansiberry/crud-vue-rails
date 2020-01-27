import axios from 'axios';

export default {
    name: 'form-new',
    data: () => ({
      isLoading: false,
      isDisabled: false,
      notice: null,
      name: '',
      email: '',
      company: '',
      summary: ''
    }),
    methods: {
      saveContact(event) {
        this.isLoading = true;
        event.preventDefault();
        axios({
          method: 'POST',
          url: '/api/contacts',
          data: this.formData,
          headers: {
            'X-CSRF-TOKEN': document.querySelector("meta[name=csrf-token]").content
          }
        }).then((response) => {
          if (response.data.status == 'ok') {
            this.notice = 'Contact Added';
            this.isDisabled = true;
            this.$emit('contact-added');
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
          summary: this.summary
        }
      }
    },
    template: `
        <form class="p-md" @submit="saveContact">
          <h2 class="mb-lg h2">New contact</h2>
          <p v-if="notice" class="notice">{{ notice }}</p>
          <div class="field field--required">
            <label>Name</label>
            <input required v-model="name" type="text" placeholder="type here" />
          </div>
          <div class="field field--required">
            <label>Email</label>
            <input required v-model="email" type="email" placeholder="type here" />
          </div>
          <div class="field field--required">
            <label>Company</label>
            <input required v-model="company" type="text" placeholder="type here" />
          </div>
          <div class="field">
            <label>Summary</label>
            <textarea placeholder="type here" v-model="summary" rows="3"></textarea>
          </div>
          <button
            class="btn mt-sm"
            :class="{'btn--loading' : isLoading, 'btn--disabled' : isDisabled}"
            >Save
          </button>
        </form>
    `,
};
