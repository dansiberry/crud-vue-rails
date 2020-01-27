import Vue from 'vue/dist/vue.esm.js';
import axios from 'axios';

import cardAccordion from './components/card-accordion.js';
import gMap from './components/g-map.js';
import formDelete from './components/form-delete.js';
import formEdit from './components/form-edit.js';
import formNew from './components/form-new.js';
import modalWrapper from './components/modal-wrapper.js';

export default(() => {
  new Vue({
      el: '#app',
      delimiters: ['{{', '}}'],
      data: {
          contacts: [],
          visibleContactIds: [],
          highlight: null,
          modal: null
      },
      components: {
          cardAccordion,
          gMap,
          formDelete,
          formEdit,
          formNew,
          modalWrapper
      },
      mounted() {
        this.fetchContacts();
      },
      methods: {
        fetchContacts() {
          axios.get(`/api/contacts.json`)
            .then((response) => {
                this.contacts = response.data;
            });
        },
        updateVisibleItems(contactIds) {
          this.visibleContactIds = contactIds;
        },
        openModal(type, id) {
          this.modal = {
            type,
            contact: id ? this.contacts.find(contact => contact.id == id) : null
          }
        }
      },
      computed: {
        contactCards() {
          const filteredContacts = this.contacts.reduce((total, contact) => {
            return (this.visibleContactIds.includes(contact.id) ? total.concat([contact]) : total)
          },[]);
          return filteredContacts;
        }
      }
  });
})();
