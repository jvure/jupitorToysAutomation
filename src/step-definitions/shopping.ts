import { When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'

import Shoppingform from '../pages/shoppingcartform.page';
import CartForm from '../pages/cartform.page';





When(/^I clicked on start shopping button$/, async () => {
    await Shoppingform.open();

});


When(
    'I buy toys from the display page Stuffed Frog {int} and Fluffy Bunny {int} and Valentine Bear {int} and Teddy Bear {int} and Handmade Doll {int} and Smiley Bear {int} and Funny Cow {int} and Smiley Face {int}',
    async (
        Frogquantity: number,
        Bunnyquantity: number,
        VBearquantity: number,
        Teddyquantity: number,
        Dollquantity: number,
        Bearquantity: number,
        Cowquantity: number,
        Smileyquantity: number
    ) => {
        console.log('Frog:', Frogquantity, 'Bunny:', Bunnyquantity, 'Valentine Bear:', VBearquantity, 'Teddy Bear:', Teddyquantity, 'Handmade Doll:', Dollquantity, 'Smiley Bear:', Bearquantity, 'Funny Cow:', Cowquantity, 'Smiley Face:', Smileyquantity);
        await Shoppingform.setQuantities(Frogquantity, Bunnyquantity, VBearquantity, Teddyquantity, Dollquantity, Bearquantity, Cowquantity, Smileyquantity);
        if (Frogquantity > 0) await Shoppingform.buyProduct('Stuffed Frog');
        if (Bunnyquantity > 0) await Shoppingform.buyProduct('Fluffy Bunny');
        if (VBearquantity > 0) await Shoppingform.buyProduct('Valentine Bear');
        if (Teddyquantity > 0) await Shoppingform.buyProduct('Teddy Bear');
        if (Dollquantity > 0) await Shoppingform.buyProduct('Handmade Doll');
        if (Bearquantity > 0) await Shoppingform.buyProduct('Smiley Bear');
        if (Cowquantity > 0) await Shoppingform.buyProduct('Funny Cow');
        if (Smileyquantity > 0) await Shoppingform.buyProduct('Smiley Face');
        console.log('Finished buying products........');
        await browser.pause(2000);
    }
);


When(/^I go to the cart page$/, async () => {
    await CartForm.open();
    await browser.pause(2000);

});

Then(
    'I should see the correct price and subtotal for each product Stuffed Frog {float} and Fluffy Bunny {float} and Valentine Bear {float} and Teddy Bear {float} and Handmade Doll {float} and Smiley Bear {float} and Funny Cow {float} and Smiley Face {float}',
    async (
        Frogprice: number,
        Bunnyprice: number,
        VBearprice: number,
        Teddyprice: number,
        Dollprice: number,
        Bearprice: number,
        Cowprice: number,
        Smileyprice: number
    ) => {

        console.log(
            'Expected Prices:',
            Frogprice,
            Bunnyprice,
            VBearprice,
            Teddyprice,
            Dollprice,
            Bearprice,
            Cowprice,
            Smileyprice
        );

        const actualPrices = await Shoppingform.getActualProductPrice();

        // console.log('Actual Frog Price:', actualPrices.actualFrogPrice);
        // console.log('Actual Bunny Price:', actualPrices.actualBunnyPrice);
        // console.log('Actual Valentine Bear Price:', actualPrices.actualVBearPrice);
        // console.log('Actual Teddy Price:', actualPrices.actualTeddyPrice);
        // console.log('Actual Doll Price:', actualPrices.actualDollPrice);
        // console.log('Actual Bear Price:', actualPrices.actualBearPrice);
        // console.log('Actual Cow Price:', actualPrices.actualCowPrice);
        // console.log('Actual Smiley Price:', actualPrices.actualSmileyPrice);

        expect(actualPrices.actualFrogPrice).toBe(Frogprice);
        expect(actualPrices.actualBunnyPrice).toBe(Bunnyprice);
        expect(actualPrices.actualVBearPrice).toBe(VBearprice);
        expect(actualPrices.actualTeddyPrice).toBe(Teddyprice);
        expect(actualPrices.actualDollPrice).toBe(Dollprice);
        expect(actualPrices.actualBearPrice).toBe(Bearprice);
        expect(actualPrices.actualCowPrice).toBe(Cowprice);
        expect(actualPrices.actualSmileyPrice).toBe(Smileyprice);

        //now setting the quantities on the UI for each product to validate the subtotal
        if (Shoppingform.getFrogQuantity() > 0) {
            await Shoppingform.setProductQuantityOnUi('Stuffed Frog', Shoppingform.getFrogQuantity());
        }
        if (Shoppingform.getBunnyQuantity() > 0) {
            await Shoppingform.setProductQuantityOnUi('Fluffy Bunny', Shoppingform.getBunnyQuantity());
        }
        if (Shoppingform.getVBearQuantity() > 0) {
            await Shoppingform.setProductQuantityOnUi('Valentine Bear', Shoppingform.getVBearQuantity());
        }
        if (Shoppingform.getTeddyQuantity() > 0) {
            await Shoppingform.setProductQuantityOnUi('Teddy Bear', Shoppingform.getTeddyQuantity());
        }
        if (Shoppingform.getDollQuantity() > 0) {
            await Shoppingform.setProductQuantityOnUi('Handmade Doll', Shoppingform.getDollQuantity());
        }
        if (Shoppingform.getBearQuantity() > 0) {
            await Shoppingform.setProductQuantityOnUi('Smiley Bear', Shoppingform.getBearQuantity());
        }
        if (Shoppingform.getCowQuantity() > 0) {
            await Shoppingform.setProductQuantityOnUi('Funny Cow', Shoppingform.getCowQuantity());
        }

        if (Shoppingform.getSmileyQuantity() > 0) {
            await Shoppingform.setProductQuantityOnUi('Smiley Face', Shoppingform.getSmileyQuantity());
        }

        console.log('I have finished checking the prices for each product........');
        // after setting quantities on the UI, now validating the subtotal for each product
        await Shoppingform.validateSubtotal(Frogprice, Bunnyprice, VBearprice, Teddyprice, Dollprice, Bearprice, Cowprice, Smileyprice);
    });


//calculating the total of all products and validating it with the total displayed on the cart page
When(/^The cart total should equal the sum of the product subtotals$/, async () => {

    const actualTotalPrice = await Shoppingform.getActualTotalPrice();
    const expectedTotalPrice = await Shoppingform.getExpectedTotalPrice();

    expect(actualTotalPrice).toBeCloseTo(expectedTotalPrice, 2);
});




