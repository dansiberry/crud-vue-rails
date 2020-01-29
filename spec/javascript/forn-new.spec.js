import flushPromises from "flush-promises"
import { shallowMount } from '@vue/test-utils'
import formNew from '../../app/javascript/components/form-new.js';

it("Shows a notification when given", () => {
  const wrapper = shallowMount(formNew);
  wrapper.vm.notice = "notice"
  expect(wrapper.text()).toMatch('notice')
});

let data = {
    status: 'ok',
    message: 'Contact added'
}

const postNewContactStub = () => {
  return new Promise((resolve, reject) => {
    resolve({ data })
  })
}


it("Posts form data on submit and handles response", async () => {
  const wrapper = shallowMount(formNew);
  wrapper.setMethods({ postNewContact: postNewContactStub });
  const spyPostNewContact = jest.spyOn(wrapper.vm, 'postNewContact')

  wrapper.find("[name='name']").setValue("bob")
  wrapper.find("[name='email']").setValue("a@b.com")
  wrapper.find("[name='company']").setValue("bob.inc")
  wrapper.find("form").trigger("submit")

  await flushPromises()

  expect(spyPostNewContact).toHaveBeenCalled();
  expect(wrapper.emitted()['contact-added']).toBeDefined();
  expect(wrapper.text()).toMatch(/Contact Added/);
})
