
// TODO Task 2

import { Injectable } from "@angular/core";
import { LineItem, LineItemSlice } from "./models";
import { ComponentStore } from "@ngrx/component-store";

const INIT: LineItemSlice = {
    loadedOn: 0,
    lineItems: []
  }

// Use the following class to implement your store
@Injectable()
export class CartStore extends ComponentStore<LineItemSlice> {

    constructor() { super(INIT) }

    // Mutators
    readonly addToStore = this.updater<LineItem>(
        (slice: LineItemSlice, value: LineItem) => {
            // value.id = uuidv4().substring(0, 8)
            const newSlice: LineItemSlice = {
                loadedOn: slice.loadedOn,
                lineItems: [] // To add 
            }

            // Copy all the existing lineItems from old slice to new slice
            for (let i of slice.lineItems) {
                newSlice.lineItems.push(i)
            }
            newSlice.lineItems.push(value)
            return newSlice
        }
    )

    readonly loadToStore = this.updater<LineItem[]>(
        (_slice: LineItemSlice, values: LineItem[]) => {
        return {
            loadedOn: (new Date()).getTime(),
            lineItems: values
        } as LineItemSlice
        }
    )

    // Selectors
    readonly getAllItems = this.select<LineItem[]>(
        (slice: LineItemSlice) => slice.lineItems
    )
}
