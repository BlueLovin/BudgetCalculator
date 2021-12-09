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

// retrieve all objects from firebase
export const fetchAllItems = async (): Promise<Array<Item>> => {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  const data: Array<any> = [];

  snapshot.docs.forEach((_data) => {
    data.push({
      id: _data.id, // because id field in separate function in firestore
      ..._data.data(), // the remaining fields
    });
  });

  // return and convert back it array of item
  return data as Array<Item>;
};
