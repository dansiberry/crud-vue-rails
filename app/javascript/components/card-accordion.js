import toggleIcon from './toggle-icon.js';

export default {
    name: 'card-accordion',
    props: {
        heading: String,
        text: String,
        subheading: String,
        id: Number,
        image: String,
    },
    components: {
        toggleIcon
    },
    data: () => ({
      isActive: false
    }),
    methods: {
        handleClick(e) {
          this.isActive = !this.isActive;
        },
    },
    template: `
        <div class="card-accordion" :id="'card-' + id" :class="{'toggled' : isActive}">
            <div class="card-accordion__left">
                <p v-if="subheading" class="h4 card-accordion__sub-heading">{{ subheading }}</p>
            </div>

            <div class="card-accordion__right">
                <h3 class="h3 card-accordion__heading">{{ heading }}</h3>
                <div class="card-accordion__toggled-content">
                    <p class="mb-sm">{{ text }}</p>
                    <button @click="$emit('open-modal', 'delete', id)" class="btn btn--mini mb-sm mr-sm">Delete</button>
                    <button @click="$emit('open-modal', 'edit', id)" class="btn btn--mini">Edit</button>
                </div>

                <toggle-icon
                  class="card-accordion__toggle"
                  :active="false"
                  @click.native="handleClick">
                </toggle-icon>
            </div>
        </div>
    `,
};
