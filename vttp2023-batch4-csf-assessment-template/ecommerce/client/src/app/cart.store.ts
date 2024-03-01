
// TODO Task 2

import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { LineItem, Product } from "./models";
import { Subject } from "rxjs";

const ENTRY = 'item'; // Collection name

// Use the following class to implement your store
@Injectable()
export class CartStore extends Dexie {

    // Table with LineItem interface as the schema. Number is the type of the PK.
    private lineItems!: Dexie.Table<LineItem, number>

    onEntries = new Subject<LineItem[]>

    constructor() {
        super('khairuls-LineItemDB') // DB Name

        this.version(1).stores({ // Schema Version
        [ENTRY]: '++prodId, quantity, name, price' // Attributes to be indexed
        });

        this.lineItems = this.table(ENTRY); // Hold a reference to the to the collection
        
        this.getLineItemEntries().then(
            (result) => this.onEntries.next(result));
    }

    getLineItemEntries(): Promise<LineItem[]> {
        return this.lineItems
            .orderBy('prodId').reverse().toArray();
    }
    
    addEntry(newEntry: LineItem): Promise<any> {
        return this.lineItems.add(newEntry)
            .then(pk => {
                console.info('pk: ', pk);
                return this.getLineItemEntries();
            })
            .then(result => this.onEntries.next(result));
    }



}
