import { $, browser } from '@wdio/globals';
import Page from './page';
import shoppingUtils from '../utils/shoppingUtils.util.ts';

class ShoppingFormPage extends Page {

    private Frogquantity: number = 0;
    private Bunnyquantity: number = 0;
    private VBearquantity: number = 0;
    private Teddyquantity: number = 0;
    private Dollquantity: number = 0;
    private Bearquantity: number = 0;
    private Cowquantity: number = 0;
    private Smileyquantity: number = 0;
    private actualTotalPrice: number = 0.0;
    private expectedTotalPrice: number = 0.0;

    public open() {
        return super.open('/#/shop');
    }


    // Setters for product quantities which are mentioned in the feature file.
    //this method finds the input field for the specified product and sets the quantity to the provided value.
    public async setProductQuantityOnUi(
        productName: string,
        quantity: number
    ) {
        const productRow = await $(
            `//tr[td[1][contains(normalize-space(), "${productName}")]]`
        );

        const quantityInput = productRow.$('./td[3]//input');

        await quantityInput.waitForDisplayed();
        await quantityInput.setValue(quantity.toString());

        // Trigger the cart update
        await browser.keys('Enter');
    }

    public async setActualTotalPrice(price: number) {
        this.actualTotalPrice = price;
    }

    public async setExpectedTotalPrice(price: number) {
        this.expectedTotalPrice = price;
    }

    public async getActualTotalPrice(): Promise<number> {
        return this.actualTotalPrice;
    }

    public async getExpectedTotalPrice(): Promise<number> {
        return this.expectedTotalPrice;
    }




    /** * Find a product card using the product name. */
    private getProduct(productName: string) {
        return $(`//li[contains(@class, "product")][.//h4[normalize-space()="${productName}"]]`);
    }

    /** * Buy a product the requested number of times. */
    public async buyProduct(productName: string) {
        const product = this.getProduct(productName);
        const buyButton = product.$('a.btn.btn-success');

        await buyButton.click();

    }

    /** * Get the displayed price for a product. */
    public async getProductPrice(productName: string): Promise<number> {
        const productRow = await $(
            `//tr[td[1][contains(normalize-space(), "${productName}")]]`
        );
        const priceText = await productRow.$('./td[2]').getText();
        // return parseFloat(priceText.replace('$', '').trim());
        return shoppingUtils.parsePrice(priceText);
    }

    //This method retrieves the subtotal for a specific product from the cart page. 
    // It locates the row corresponding to the product, waits for it to be displayed, and then extracts the subtotal value from the appropriate cell. 
    // The subtotal is returned as a number after removing any non-numeric characters.

    public async getProductSubtotal(productName: string, quantity: number): Promise<number> {
        if (quantity > 0) {
            const productRow = $(
                `//tr[contains(@class,"cart-item")][td[contains(normalize-space(), "${productName}")]]`
            );

            await productRow.waitForDisplayed({
                timeout: 10000
            });

            const subtotalCell = productRow.$('./td[4]');

            await subtotalCell.waitForDisplayed({
                timeout: 10000
            });

            const subtotalText = await subtotalCell.getText();

            return parseFloat(
                subtotalText.replace(/[^0-9.-]/g, '')
            );
        } else {
            return 0.0; // Return 0.0 if quantity is less than or equal to 0
        }
    }


    //This method sets the quantities for various products in the shopping cart. It takes in the quantities for each product as parameters 
    // and assigns them to the corresponding class properties. These quantities can later be used for calculations, validations,
    //  or other operations related to the shopping cart.

    public async setQuantities(Frogquantity: number,
        Bunnyquantity: number,
        VBearquantity: number,
        Teddyquantity: number,
        Dollquantity: number,
        Bearquantity: number,
        Cowquantity: number,
        Smileyquantity: number
    ) {

        this.Frogquantity = Frogquantity;
        this.Bunnyquantity = Bunnyquantity;
        this.VBearquantity = VBearquantity;
        this.Teddyquantity = Teddyquantity;
        this.Dollquantity = Dollquantity;
        this.Bearquantity = Bearquantity;
        this.Cowquantity = Cowquantity;
        this.Smileyquantity = Smileyquantity;
    }

    public getFrogQuantity(): number {
        return this.Frogquantity;
    }

    public getBunnyQuantity(): number {
        return this.Bunnyquantity;
    }

    public getVBearQuantity(): number {
        return this.VBearquantity;
    }

    public getTeddyQuantity(): number {
        return this.Teddyquantity;
    }

    public getDollQuantity(): number {
        return this.Dollquantity;
    }

    public getBearQuantity(): number {
        return this.Bearquantity;
    }

    public getCowQuantity(): number {
        return this.Cowquantity;
    }

    public getSmileyQuantity(): number {
        return this.Smileyquantity;
    }

    //this method checks the quantity of each product and if the quantity is greater than 0, it retrieves the actual price for that product from the cart page. 
    // If the quantity is 0, it sets the actual price to 0.0. Finally, it returns an object containing the actual prices for all products.
    async getActualProductPrice() {

        const actualFrogPrice =
            this.getFrogQuantity() > 0
                ? await this.getProductPrice('Stuffed Frog')
                : 0.0;

        const actualBunnyPrice =
            this.getBunnyQuantity() > 0
                ? await this.getProductPrice('Fluffy Bunny')
                : 0.0;

        const actualVBearPrice =
            this.getVBearQuantity() > 0
                ? await this.getProductPrice('Valentine Bear')
                : 0.0;

        const actualTeddyPrice =
            this.getTeddyQuantity() > 0
                ? await this.getProductPrice('Teddy Bear')
                : 0.0;

        const actualDollPrice =
            this.getDollQuantity() > 0
                ? await this.getProductPrice('Handmade Doll')
                : 0.0;

        const actualBearPrice =
            this.getBearQuantity() > 0
                ? await this.getProductPrice('Smiley Bear')
                : 0.0;

        const actualCowPrice =
            this.getCowQuantity() > 0
                ? await this.getProductPrice('Funny Cow')
                : 0.0;

        const actualSmileyPrice =
            this.getSmileyQuantity() > 0
                ? await this.getProductPrice('Smiley Face')
                : 0.0;

        return {
            actualFrogPrice,
            actualBunnyPrice,
            actualVBearPrice,
            actualTeddyPrice,
            actualDollPrice,
            actualBearPrice,
            actualCowPrice,
            actualSmileyPrice
        };
    }


    //This method validates the subtotal for each product in the shopping cart. It takes in the prices for each product as parameters,
    // calculates the expected subtotal based on the price and quantity, and compares it with the actual subtotal retrieved from the cart page. 
    // It logs the details for each product and asserts that the actual subtotal is close to the expected subtotal. 
    // Finally, it calculates and sets the total expected and actual prices for all products.
    async validateSubtotal(Frogprice: number, Bunnyprice: number, VBearprice: number, Teddyprice: number, Dollprice: number, Bearprice: number, Cowprice: number, Smileyprice: number) {

        console.log('Validating subtotal for each product........');

        let totalExpectedPrice = 0;  // used to calculate total expected price for all products in the cart
        let totalActualPrice = 0;  // this is used to calculate total actual price for all products in the cart retrieved from UI page

        // defining an array of products with their respective prices and quantities
        const products = [
            {
                name: 'Stuffed Frog',
                price: Frogprice,
                quantity: this.getFrogQuantity(),
                actualSubtotal: await this.getProductSubtotal('Stuffed Frog', this.getFrogQuantity())
            },
            {
                name: 'Fluffy Bunny',
                price: Bunnyprice,
                quantity: this.getBunnyQuantity(),
                actualSubtotal: await this.getProductSubtotal('Fluffy Bunny', this.getBunnyQuantity())
            },
            {
                name: 'Valentine Bear',
                price: VBearprice,
                quantity: this.getVBearQuantity(),
                actualSubtotal: await this.getProductSubtotal('Valentine Bear', this.getVBearQuantity())
            },
            {
                name: 'Teddy Bear',
                price: Teddyprice,
                quantity: this.getTeddyQuantity(),
                actualSubtotal: await this.getProductSubtotal('Teddy Bear', this.getTeddyQuantity())
            },
            {
                name: 'Handmade Doll',
                price: Dollprice,
                quantity: this.getDollQuantity(),
                actualSubtotal: await this.getProductSubtotal('Handmade Doll', this.getDollQuantity())
            },
            {
                name: 'Smiley Bear',
                price: Bearprice,
                quantity: this.getBearQuantity(),
                actualSubtotal: await this.getProductSubtotal('Smiley Bear', this.getBearQuantity())
            },
            {
                name: 'Funny Cow',
                price: Cowprice,
                quantity: this.getCowQuantity(),
                actualSubtotal: await this.getProductSubtotal('Funny Cow', this.getCowQuantity())
            },
            {
                name: 'Smiley Face',
                price: Smileyprice,
                quantity: this.getSmileyQuantity(),
                actualSubtotal: await this.getProductSubtotal('Smiley Face', this.getSmileyQuantity())
            }
        ];

       
        for (const product of products) {

            const expectedSubtotal =
                shoppingUtils.calculateExpectedSubtotal(
                    product.price,
                    product.quantity
                );

            console.log(
                `${product.name} | ` +
                `Price: ${product.price} | ` +
                `Quantity: ${product.quantity} | ` +
                `Expected: ${expectedSubtotal} | ` +
                `Actual: ${product.actualSubtotal}`
            );

            expect(product.actualSubtotal)
                .toBeCloseTo(expectedSubtotal, 2);
            totalExpectedPrice += expectedSubtotal;
            totalActualPrice += product.actualSubtotal;
        }
        await this.setExpectedTotalPrice(totalExpectedPrice);
        await this.setActualTotalPrice(totalActualPrice);
    }

}


export default new ShoppingFormPage();