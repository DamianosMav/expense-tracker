import { mount } from '@vue/test-utils';
import AddTransaction from '../components/AddTransaction.vue';
import { describe, expect } from 'vitest';
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import IftaLabel from 'primevue/iftalabel'


const mockToast = {
  error: vi.fn(),
  success: vi.fn(),
};

vi.mock('vue-toastification', () => ({
  useToast: () => mockToast,
}));

describe('AddTransaction', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
  it('renders correctly', () => {
    const wrapper = mount(AddTransaction, {
      global: {
        plugins: [PrimeVue],
        components: {
          InputText,
          Button,
          IftaLabel
        }
      }
    });

    expect(wrapper.find('input#text').exists()).toBe(true)
    expect(wrapper.find('input#amount').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  });

  it("fires toast.error when fields are empty", async () => {
    const wrapper = mount(AddTransaction, {
      global: {
        plugins: [PrimeVue],
        components: { InputText, Button, IftaLabel },
      }
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockToast.error).toHaveBeenCalledWith("Both field's must be filled");
  });

  it('fires toast.error when amount is invalid', async () => {
    const wrapper = mount(AddTransaction, {
        global: {
            plugins: [PrimeVue],
            components: { InputText, Button, IftaLabel },
        }
    });

    await wrapper.find("#text").setValue("Invalid Amount");
    await wrapper.find("#amount").setValue("invalid");
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockToast.error).toHaveBeenCalledWith("Please enter a valid positive or negative number (decimals allowed).");
  });

  it('fires toast.success when both fields are correct', async () => {
    const wrapper = mount(AddTransaction, {
        global: {
            plugins: [PrimeVue],
            components: { InputText, Button, IftaLabel },
        }
    });

    await wrapper.find("#text").setValue("Salary");
    await wrapper.find("#amount").setValue(800);
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted("transactionSubmitted")).toBeTruthy();
    expect(wrapper.emitted("transactionSubmitted")[0][0]).toEqual(
        {text: "Salary", amount: 800}
    );

    expect(mockToast.success).toHaveBeenCalledWith("Transaction added");

    expect(wrapper.find("#text").element.value).toBe("");
    expect(wrapper.find("#amount").element.value).toBe("");
  });

    it("accepts negative decimal values", async () => {
    const wrapper = mount(AddTransaction, {
        global: {
        plugins: [PrimeVue],
        components: { InputText, Button, IftaLabel },
        }
    });

    await wrapper.find("#text").setValue("Groceries");
    await wrapper.find("#amount").setValue("-45.67");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted("transactionSubmitted")[0][0]).toEqual({
        text: "Groceries",
        amount: -45.67,
        });
    });
});