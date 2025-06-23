import { mount } from '@vue/test-utils'
import Header from '../components/Header.vue'
import PrimeVue from 'primevue/config'
import RadioButton from 'primevue/radiobutton'

describe('HeaderComponent', () => {
  it('emits € when euro is selected', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [PrimeVue],
        components: { RadioButton }
      }
    })

    // Euro is selected by default
    expect(wrapper.emitted('currencySymbolChange')).toBeTruthy()
    expect(wrapper.emitted('currencySymbolChange')[0]).toEqual(['€'])
  })

  it('emits $ when usd is selected', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [PrimeVue],
        components: { RadioButton }
      }
    })

    // Find and select the USD radio input
    const usdInput = wrapper.find('input[id="usd"]')
    await usdInput.setValue('usd')

    // Wait for Vue to process the watcher
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('currencySymbolChange')).toBeTruthy()
    const emitted = wrapper.emitted('currencySymbolChange')
    const last = emitted[emitted.length - 1]

    expect(last).toEqual(['$'])
  })
})
