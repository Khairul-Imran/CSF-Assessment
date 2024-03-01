import { Injectable } from "@angular/core";
import { LineItem } from "./models";

@Injectable()
export class CartStore2{

    lineItemsArray: LineItem[] = [];

    addLineItem(lineItem: LineItem) {
        console.info("Adding line item: ", lineItem)
        this.lineItemsArray.push(lineItem);
    }

    getLineItems() {
        return this.lineItemsArray;
    }

    getLineItemStoreLength(): number {
        return this.lineItemsArray.length
    }

}