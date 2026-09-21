class ShoppingUtils {

    public parsePrice(priceText: string): number {
        return parseFloat(
            priceText.replace('$', '').trim()
        );
    }

      public calculateExpectedSubtotal(
        price: number,
        quantity: number
    ): number {
        return price * quantity;
    }

}

export default new ShoppingUtils();