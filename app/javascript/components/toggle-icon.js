export default {
    name: 'toggle-icon',
    props: {
        active: Boolean
    },
    template: `
      <div class="toggle-icon" :class="{ 'toggled' : active }">
          <svg class="icon toggle-icon__plus-outline">
              <use xlink:href="#plus-outline"/>
          </svg>
          <svg class="icon toggle-icon__plus-solid">
              <use xlink:href="#plus-solid"/>
          </svg>
          <svg class="icon toggle-icon__minus-outline">
              <use xlink:href="#minus-outline"/>
          </svg>
          <svg class="icon toggle-icon__minus-solid">
              <use xlink:href="#minus-solid"/>
          </svg>
      </div>
    `,
};
