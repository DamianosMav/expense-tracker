import { mount } from '@vue/test-utils';
import TransactionList from '../components/TransactionList.vue';
import { describe, expect } from 'vitest';

describe("TransactionList", () => {
    it("renders no transaction items when the list is empty",() => {
        const wrapper = mount(TransactionList, {
            props : {transactions : []}
        });

        const items = wrapper.findAll(".transaction-item")
        expect(items.length).toBe(0);
    })

    it("renders all transaction items with default (€) currency when list is populated", () => {
        const mockTransactions = [
            { id: 1, text: "Salary", amount: 800 },
            { id: 2, text: "Headphones", amount: -50 },
            { id: 3, text: "Phone", amount: -40 },
        ];
        const wrapper = mount(TransactionList, {
            props : { 
                transactions : mockTransactions,  
            }
        })
        const items = wrapper.findAll(".transaction-item");
        expect(items).toHaveLength(3);
        
        //Text comparison
        expect(items[0].text()).toContain("Salary");
        expect(items[1].text()).toContain("Headphones");
        expect(items[2].text()).toContain("Phone");
        //Amount comparison
        expect(items[0].text()).toContain("800€");
        expect(items[1].text()).toContain("-50€");
        expect(items[2].text()).toContain("-40€");
    })

    it("reactively updates currency symbol when props change", async () => {
        const mockTransactions = [
            { id: 1, text: "Salary", amount: 800 }
        ];
        const wrapper = mount(TransactionList, {
            props : { 
                transactions : mockTransactions,
                currencySymbol : "€"  
            }
        })
        const items = wrapper.findAll(".transaction-item");
        expect(items).toHaveLength(1);
        
        //Text comparison
        expect(items[0].text()).toContain("Salary");
        //Amount comparison
        expect(items[0].text()).toContain("800€");

        await wrapper.setProps({
            transactions: mockTransactions,
            currencySymbol: "$"
        })
        //Text comparison
        expect(items[0].text()).toContain("Salary");
        //Amount comparison
        expect(items[0].text()).toContain("$800");
    });
    it("emits 'transactionDeleted' with correct ID when delete button is clicked", async () => {
        const mockTransactions = [
            { id: 1, text: "Salary", amount: 800 },
            { id: 2, text: "Phone", amount: -50 }
        ];
        const wrapper = mount(TransactionList, {
            props: {
                transactions : mockTransactions,
                currencySymbol : "€"
            }
        })

        const deleteButtons = wrapper.findAll(".delete-btn");
        
        //Simulating user presses the second item delete button
        await deleteButtons[1].trigger("click");
        // Assert that event was emitted
        expect(wrapper.emitted("transactionDeleted")).toBeTruthy();
        // Check the emitted id is correct
        expect(wrapper.emitted("transactionDeleted")[0]).toEqual([2]);

    });
})
