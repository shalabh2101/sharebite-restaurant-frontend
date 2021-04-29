import React, { Fragment, useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SubHeader from "./subHeaders";
import Card from "./components/Card/Card";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import cloneDeep from 'lodash/cloneDeep';

const Menu = () => {

    const TYPE = {
        "SECTION" : "Section",
        "ITEM" : "Item",
        "OPTION" : "Option",
        "CHOICE" : "Choice",
    }

    let sampleData = {
        "sections": [
            {
                "name": "Lunch Specials",
                "items": [
                    {
                        "title": "Chicken Over Rice",
                        "price": 12,
                        "options": [
                            {
                                "name": "Add Rice",
                                "choices": [
                                    {
                                        "name": "White Rice",
                                        "price": 2
                                    },
                                    {
                                        "name": "Brown Rice",
                                        "price": 2
                                    }
                                ]
                            }
                        ]
                    }
                ],
            }
        ]
    }
    
    const [restaurantMenu, setRestaurantMenu] = useState(sampleData);
    const [menuItems, setMenuItems] = useState([]);
    const [itemOptions, setItemOptions] = useState([]);
    const [optionChoices, setOptionChoices] = useState([]);

    //selection indices
    const [selectedSectionIndex, setSelectedSectionIndex] = useState(-1);
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(-1);

    const [newProperty, setNewProperty] = useState('');

    //Modal
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');


    const handleClose = () => {
        setType('');
        setShow(false);
    }

    const handleShow = (menuType) => {
        setType(menuType);
        setShow(true);
    }

    const handleMenuSelection = (selectedIndex) => {

        let items = cloneDeep(restaurantMenu["sections"][selectedIndex]["items"]);

        setSelectedSectionIndex(selectedIndex);
        setSelectedItemIndex(-1);
        setSelectedOptionIndex(-1);
        setSelectedChoiceIndex(-1);
        setMenuItems(items);
        setItemOptions([]);
        setOptionChoices([]);
    }

    const handleItemSelection = (selectedIndex) => {

        let options = cloneDeep(restaurantMenu["sections"][selectedSectionIndex]["items"][selectedIndex]["options"]);

        setSelectedItemIndex(selectedIndex);
        setSelectedOptionIndex(-1);
        setSelectedChoiceIndex(-1);
        setItemOptions(options);
        setOptionChoices([]);
    }

    const handleOptionSelection = (selectedIndex) => {

        let choices = cloneDeep(restaurantMenu["sections"][selectedSectionIndex]["items"][selectedItemIndex]["options"][selectedIndex]["choices"]);

        setSelectedOptionIndex(selectedIndex);
        setSelectedChoiceIndex(-1);
        setOptionChoices(choices);
    }

    const handleInputChange = (e) => {
        setNewProperty(e.target.value);
    }

    const handleSaveBtnClick = (e) => {
        if(newProperty.length > 0){
            addNewProperty(type, newProperty);
            handleClose();
        }
    }

    const addNewProperty = (sectionType, newValue) => {

        let restaurantMenuCopy = cloneDeep(restaurantMenu);
        switch (sectionType){
            case TYPE.SECTION :
                let newSection = {
                    "name" : newValue,
                    "items": []
                }
                restaurantMenuCopy["sections"].push(newSection);
                setRestaurantMenu(restaurantMenuCopy);
                break;
            case TYPE.ITEM:
                let newItem = {
                    "title" : newValue,
                    "options": []
                }

                restaurantMenuCopy["sections"][selectedSectionIndex]["items"].push(newItem);
                setRestaurantMenu(restaurantMenuCopy);
                setMenuItems(restaurantMenuCopy["sections"][selectedSectionIndex]["items"]);
                break;
            case TYPE.OPTION:
                let newOption = {
                    "name" : newValue,
                    "choices": []
                }

                restaurantMenuCopy["sections"][selectedSectionIndex]["items"][selectedItemIndex]["options"].push(newOption);
                setRestaurantMenu(restaurantMenuCopy);
                setMenuItems(restaurantMenuCopy["sections"][selectedSectionIndex]["items"]);
                setItemOptions(restaurantMenuCopy["sections"][selectedSectionIndex]["items"][selectedItemIndex]["options"]);
                break;
            case TYPE.CHOICE:
                let newChoice = {
                    "name" : newValue,
                }

                restaurantMenuCopy["sections"][selectedSectionIndex]["items"][selectedItemIndex]["options"][selectedOptionIndex]["choices"].push(newChoice);
                setRestaurantMenu(restaurantMenuCopy);
                setMenuItems(restaurantMenuCopy["sections"][selectedSectionIndex]["items"]);
                setItemOptions(restaurantMenuCopy["sections"][selectedSectionIndex]["items"][selectedItemIndex]["options"]);
                setOptionChoices(restaurantMenuCopy["sections"][selectedSectionIndex]["items"][selectedItemIndex]["options"][selectedOptionIndex]["choices"]);
                break;
        }

    }

    const renderMenuSection = (sections) => {

        return (

            <Fragment>
                {
                    sections.map((section, i) => {
                        return <Card key={section.name} selected={i === selectedSectionIndex}  cardText={section.name} customClick={() => handleMenuSelection(i)} />
                    })
                }
            </Fragment>
        );
    }

    const renderItemSection = (items) => {

        if(items && items.length)
        {
            return (

                <Fragment>
                    {
                        items.map((item,i) => {
                            return <Card key={item.title} selected={i === selectedItemIndex}  cardText={item.title} customClick={() => handleItemSelection(i) }/>
                        })
                    }
                </Fragment>
            );
        }

        return null;
    }

    const renderOptionSection = (options) => {

        if(options && options.length)
        {
            return (

                <Fragment>
                    {
                        options.map((option,i) => {
                            return <Card cardText={option.name} selected={i === selectedOptionIndex} customClick={() => handleOptionSelection(i)}/>
                        })
                    }
                </Fragment>
            );
        }

        return null;
    }

    const renderOptionChoicesSection = (optionChoices) => {

        if(optionChoices && optionChoices.length)
        {
            return (

                <Fragment>
                    {
                        optionChoices.map((optionChoice,i) => {
                            return <Card cardText={optionChoice.name} selected={i === selectedChoiceIndex} customClick={() => setSelectedChoiceIndex(i)}/>
                        })
                    }
                </Fragment>
            );
        }

        return null;
    }

    const renderModal = () => {

        return (

            <Fragment>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add {type} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>{type} Name</Form.Label>
                                <Form.Control type="text" name="name" onChange={ (e) => handleInputChange(e)}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSaveBtnClick}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }

    return (
        <div className="container marginInside">

            {renderModal()}
            <div className="col-md-3 divSubContainers">
                <SubHeader name="Menu Sections" type={TYPE.SECTION} onBtnClick={ () => handleShow(TYPE.SECTION)}/>
                <div style={{marginBottom: "2%"}}>
                    {renderMenuSection(restaurantMenu["sections"])}
                </div>
            </div>

            <div className="col-md-3 divSubContainers">
                <SubHeader name="Items" type={TYPE.ITEM} disable={selectedSectionIndex === -1} onBtnClick={ () => handleShow(TYPE.ITEM)}/>
                <div style={{marginBottom: "5%"}}>
                    {renderItemSection(menuItems)}
                </div>
            </div>

            <div className="col-md-3 divSubContainers">
                <SubHeader name="Item Options" type={TYPE.OPTION} disable={selectedItemIndex === -1} onBtnClick={ () => handleShow(TYPE.OPTION)}/>
                <div style={{marginBottom: "5%"}}>
                    {renderOptionSection(itemOptions)}
                </div>
            </div>

            {
                optionChoices ? (
                    <div className="col-md-3 divSubContainers">
                        <SubHeader name="Option choices" type={TYPE.CHOICE} disable={selectedOptionIndex === -1} onBtnClick={ () => handleShow(TYPE.CHOICE)}/>
                        <div style={{marginBottom: "5%"}}>
                            {renderOptionChoicesSection(optionChoices)}
                        </div>
                    </div>
                ) : null
            }
        </div>
                );
}

export default Menu;