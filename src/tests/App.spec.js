import { mount } from '@vue/test-utils';
import App from "../components/App.vue";
import PrimeVue from 'primevue/config';
import { describe, expect, vi, beforeEach } from 'vitest';

//Components
import Header from '../components/Header.vue';
import Balance from '../components/Balance.vue';
import IncomeExpenses from '../components/IncomeExpenses.vue';
import TransactionList from '../components/TransactionList.vue';
import AddTransaction from '../components/AddTransaction.vue';

// Toast Mock
const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
};

vi.mock('vue-toastification', () => ({
  useToast: () => mockToast,
}));

global.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  localStorage.getItem = vi.fn((key) => {
    if (key === 'transactions') return JSON.stringify([]);
    if (key === 'exchangeRates') return null;
    return null;
  });
  localStorage.setItem = vi.fn();

  fetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      conversion_rates: { EUR: 0.9 },
    }),
  });
});

describe("AppComponent", () => {
  it("renders all child components", () => {
    const wrapper = mount(App, {
      global: { plugins: [PrimeVue] },
    });

    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.findComponent(Balance).exists()).toBe(true);
    expect(wrapper.findComponent(IncomeExpenses).exists()).toBe(true);
    expect(wrapper.findComponent(TransactionList).exists()).toBe(true);
    expect(wrapper.findComponent(AddTransaction).exists()).toBe(true);
  });

  it('adds a transaction on handleTransactionSubmitted', async () => {
    const wrapper = mount(App, {
      global: { plugins: [PrimeVue] },
    });

    const initialLength = wrapper.vm.transactions.length;

    wrapper.vm.handleTransactionSubmitted({ text: 'Test Add', amount: 123 });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.transactions.length).toBe(initialLength + 1);
    expect(wrapper.vm.transactions.at(-1).text).toBe('Test Add');
  });

  it('deletes a transaction and shows a toast', async () => {
    const wrapper = mount(App, {
      global: { plugins: [PrimeVue] },
    });

    const id = 'test-id'
    wrapper.vm.transactions = [{ id, text: 'Remove me', amount: 100 }];
    wrapper.vm.handleTransactionDeleted(id);

    expect(wrapper.vm.transactions).toEqual([]);
    expect(mockToast.success).toHaveBeenCalledWith('Transaction deleted');
  });

  it('converts transactions to USD and updates symbol', () => {
    const wrapper = mount(App, {
      global: { plugins: [PrimeVue] },
    });

    wrapper.vm.transactions = [{ id: '1', text: 'Test', amount: 100 }];
    wrapper.vm.rates = { usdToEur: 2, eurToUsd: 0.5 }; // 100 EUR → 50 USD

    wrapper.vm.handleCurrencyConversion('$');

    expect(wrapper.vm.transactions[0].amount).toBe(50);
    expect(wrapper.vm.currencySymbol).toBe('$');
  });
});
