import { mount } from '@vue/test-utils';
import IncomeExpenses from '../components/IncomeExpenses.vue';
import { describe, expect } from 'vitest';


describe("IncomeExpensesComponent", () => {
    it("renders income with correct currency format for € and $", async () => {
        const wrapper = mount(IncomeExpenses, {
            props : {
                income : 15.00,
                expenses: 0.00,
                currencySymbol: "€"
            }
        });

        expect(wrapper.get("#money-plus").text()).toContain("15.00€");

        await wrapper.setProps({
            income: 20.00,
            expenses: 0.00,
            currencySymbol: "$"
        });
        expect(wrapper.get("#money-plus").text()).toContain("$20.00");

    });

    it("renders expenses with correct currency format for € and $", async () => {
        const wrapper = mount(IncomeExpenses, {
            props : {
                income: 0.00,
                expenses : -15.00,
                currencySymbol: "€"
            }
        });

        expect(wrapper.get("#money-minus").text()).toContain("-15.00€");

        await wrapper.setProps({
            income: 0.00,
            expenses: -20.00,
            currencySymbol: "$"
        });
        expect(wrapper.get("#money-minus").text()).toContain("$-20.00");
    });

    it("renders income as '0.00' with correct currency prefix or suffix", async () => {
        const wrapper = mount(IncomeExpenses, {
            props: {
                income: 0.00,
                expenses : 0.00,
                currencySymbol: "€"
            }
        });

        expect(wrapper.get("#money-plus").text()).toContain("0.00€");

        await wrapper.setProps({
            income: 0.00,
            expenses: 0.00,
            currencySymbol: "$"
        });
        expect(wrapper.get("#money-plus").text()).toContain("$0.00");

    });

    it("renders expenses as '0.00' with correct currency prefix or suffix", async () => {
        const wrapper = mount(IncomeExpenses, {
            props: {
                income: 0.00,
                expenses : 0.00,
                currencySymbol: "€"
            }
        });

        expect(wrapper.get("#money-minus").text()).toContain("0.00€")

        await wrapper.setProps({
            income: 0.00,
            expenses: 0.00,
            currencySymbol: "$"
        });
        expect(wrapper.get("#money-minus").text()).toContain("$0.00");

    });

    it("defaults to € suffix when currencySymbol prop is missing", () => {
        const wrapper = mount(IncomeExpenses, {
            props: {
                income: 10.00,
                expenses : -25.00,
            }
        });

        expect(wrapper.get("#money-plus").text()).toContain("10.00€");
        expect(wrapper.get("#money-minus").text()).toContain("-25.00€");
    });
});