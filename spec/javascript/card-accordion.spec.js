import { shallowMount } from '@vue/test-utils'
import cardAccordion from '../../app/javascript/components/card-accordion.js';

describe("Card Accordion", () => {

  const props = {
    heading: 'Heading text',
    subheading: 'subheading text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A officia impedit provident vel quod minus, inventore distinctio praesentium voluptates maxime?',
    active: false
  }

  it("Renders when given props", () => {
    const wrapper = shallowMount(cardAccordion, {propsData: props});
    expect(wrapper.text()).toMatch('Heading text')
  });

});
