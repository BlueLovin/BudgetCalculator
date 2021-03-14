import React, { useState, useEffect } from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'

import Col from 'react-bootstrap/Col'
import * as item from "../db/repositories/items";
import { isEmptyStatement } from "typescript";
var commaNumber = require('comma-number')


export type IProps = {
    addToCart: any
}

export interface IState {
    addToCart: any,
    cartItems: any
}



const List = ({addToCart} : any) => {
    const [cart, setCart] = useState<any[]>([])
    const [itemsRaw, setItemsRaw] = useState<any[]>([])
    const [types, setTypes] = useState<any[]>([])
    const [cartLowTotal, setLowTotal] = useState(0);
    const [cartHighTotal, setHighTotal] = useState(0);

    let itemsDict:any = {} // {category: [item, item...]}

    useEffect(() => {
        fetchItems();
        }, []);

        
    const fetchItems = async () => {
        // clean the itemsRaw array first
        setItemsRaw([]);

        // fetch itemsRaw from repository
        const _items = await item.all();
        
        // set itemsRaw to state
        setItemsRaw(_items);
        // console.log(_items);
        

        itemsRaw.push()
        
    };

    


    const getTypes = itemsRaw.map((item) => {
        if(!types.includes(item.type)){
            types.push(item.type)
        }
    });

    const itemsWithoutDuplicates = Array.from(new Set(itemsRaw.map(a => a.name)))
    .map(name => {
      return itemsRaw.find(a => a.name === name)
    })

     //list items list without duplicates, taking in the category as a parameter
    const listItems = (thisType: string) => itemsWithoutDuplicates.map((el) => (
        <div key={el.id}>
          <h2>{el.type == thisType ? `${el.name}: $${el.lowPrice}` : null}</h2>
          {el.type == thisType &&
          <input type="submit" value="add" onClick={() => addToCart(el)} />
            }
        </div>
      )).sort();

    // var iterateDict = types.map((type) => {

    //     setTimeout(() => {
        
    //     console.log("iterateDict called")
    //     itemsDict[type].forEach((element: any) => {
    //         console.log(element.name)
    //     })
    //     }, 2000);
    // });

    const tabs = (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={6}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Deck Material</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Fencing and Privacy</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="third">Ground Cover</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="fourth">Lighting</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="fifth">Structures</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="sixth">Water Features</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={5}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    {listItems("DECK_MATERIAL")}
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    {listItems("FENCING_AND_PRIVACY")}
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    {listItems("GROUND_COVER")}
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                    {listItems("LIGHTING")}
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                    {listItems("STRUCTURES")}
                    </Tab.Pane>
                    <Tab.Pane eventKey="sixth">
                    {listItems("WATER_FEATURES")}
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
    )


    const setRawDictionary = types.map((type) => {
        //console.log(itemsDict["DECK_MATERIAL"])
        let tempArr:any = [];
        itemsWithoutDuplicates.forEach((item) => { //add all elements that match category type to array
            if(item.type === type){
                tempArr.push(item);
            }
        })
        itemsDict[type] = tempArr//push that array to current category key in dict
            
    });
    //console.log(itemsDict);

    return (
        <div>
            <div>{tabs}</div>
        </div>
    );
};
export default List;
