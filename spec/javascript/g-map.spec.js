import { mount, shallowMount } from 'vue-test-utils';
import gMap from '../../app/javascript/components/g-map.js';

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(gMap, {
      propsData: {
        contacts: [{
          lng: '4.025486',
          lat: '37.350863'
        }]
      }
    });

    console.log(wrapper)
  });
});
