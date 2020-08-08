import { expect } from 'chai';
import { Item } from '../../_MainSource/CoreEngine/Structures/RPG/Item/Item';


describe("ItemTests", function()
{
    it("Instantiate Item", function()
    {
        let newItem = new Item();

        expect(newItem != null).to.be.true;
    });
});