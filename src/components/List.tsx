import { useState, useEffect, useCallback } from "react";

import { fetchAllItems } from "../db/repositories/items";
import Tabs from "./Tabs";

const List = ({ addToCart, formatNumber }: any) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      // fetch items from repository
      const _items = await fetchAllItems();

      // set items to state
      setItems(_items);
    };

    fetchItems();
  }, []);

  const itemsWithoutDuplicates = Array.from(
    new Set(items.map((a) => a.name))
  ).map((name) => {
    return items.find((a) => a.name === name);
  });

  //list items list without duplicates, taking in the category as a parameter
  const listItems = useCallback((thisType: string) =>
    itemsWithoutDuplicates
      .map((el) => (
        <div key={el.id}>
          {el.type === thisType && ( // if the current element matches the category passed here
            <div className="container">
              <div className="row clearfix">
                <div className="col-lg-5 ">
                  <div className="boxs project_widget">
                    <div className="pw_content">
                      <div className="pw_header">
                        <h3>{`${el.name}`}</h3>
                      </div>
                      <div className="pw_meta">
                        <span className="">{`$${formatNumber(
                          el.lowPrice
                        )} - $${formatNumber(el.highPrice)}`}</span>
                        <input
                          type="submit"
                          value="add"
                          onClick={() => addToCart(el)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))
      .sort(), [addToCart, formatNumber, itemsWithoutDuplicates]);

  return (
    <div>
      <Tabs listItems={listItems} />
    </div>
  );
};
export default List;
