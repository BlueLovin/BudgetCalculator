// import db config
import db from "..";

// collection name
const COLLECTION_NAME = "items";

// mapping the item document
export type Item = {
    type: string;
    name: string;
    lowPrice: number;
    highPrice: number;
};

// retrieve all items
export const all = async (): Promise<Array<Item>> => {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const data: Array<any> = [];

    snapshot.docs.map((_data) => {
        data.push({
            id: _data.id, // because id field in separate function in firestore
            ..._data.data(), // the remaining fields
        });
        console.log(_data.data())
    });

    // return and convert back it array of item
    return data as Array<Item>;
};

// create a item
export const create = async (item: Item): Promise<Item> => {
    const docRef = await db.collection(COLLECTION_NAME).add(item);

    // return new created item
    return {
        id: docRef.id,
        ...item,
    } as Item;
};

// update a item
export const update = async (id: string, item: Item): Promise<Item> => {
    await db.collection(COLLECTION_NAME).doc(id).update(item);

    // return updated item
    return {
        id: id,
        ...item,
    } as Item;
};

// delete a item
export const remove = async (id: string) => {
    await db.collection(COLLECTION_NAME).doc(id).delete()
}