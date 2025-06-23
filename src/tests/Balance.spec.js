import { mount } from '@vue/test-utils';
import Balance from '../components/Balance.vue';
import { describe, expect } from 'vitest';

describe("BalanceComponent", () => {
  it("renders balance with 2 decimals and with € suffix when currencySymbol is not $", () =>{
    const wrapper = mount(Balance, {
        props: {total : 1234.6729, currencySymbol: "€"}   
    });
    expect(wrapper.get("#balance").text()).toContain("1234.67€");
  });

  it("renders balance 2 decimals and with $ prefix when currencySymbol is $", () => {
    const wrapper = mount(Balance, {
        props: {total: 674.353, currencySymbol: "$"}
    });
    expect(wrapper.get("#balance").text()).toContain("$674.35");
  });

  it("updates balance text when the props change", async () => {
    const wrapper = mount(Balance, {
        props: {total: 10.00, currencySymbol: "€"}
    });

    expect(wrapper.get("#balance").text()).toContain("10.00€");

    await wrapper.setProps({total: 20.00});
    expect(wrapper.get("#balance").text()).toContain("20.00€");

    await wrapper.setProps({total: 30.00, currencySymbol: "$"});
    expect(wrapper.get("#balance").text()).toContain("$30.00");
  });

  it("shows 0.00 with the correct € suffix or $ prefix if the balance is 0", async () => {
    const wrapper = mount(Balance, {
        props: {total: 0.00, currencySymbol: "€"}
    });

    expect(wrapper.get("#balance").text()).toContain("0.00€");

    await wrapper.setProps({total: 0.00, currencySymbol: "$"});
    expect(wrapper.get("#balance").text()).toContain("$0.00");
  });
});
