import toggleIcon from './toggle-icon.js';

export default {
    name: 'modal-wrapper',
    mounted() {
      document.querySelector('body').classList.add('modal-active');
    },
    methods: {
      close() {
        document.querySelector('body').classList.remove('modal-active');
        this.$emit('close');
      }
    },
    components: {
        toggleIcon
    },
    template: `
      <div class="modal-wrapper">
        <div class="modal-wrapper__content">
          <toggle-icon
            class="modal-wrapper__icon"
            :active="false"
            @click.native="close">
          </toggle-icon>
          <slot>
          </slot>
        </div>
      </div>
    `,
};
