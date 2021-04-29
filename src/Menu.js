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

    //selected menu
    const [selectedSection, setSelectedSection] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const [selectedOption, setSelectedOption] = useState();
    const [selectedChoice, setSelectedChoice] = useState();

    //
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

    const handleMenuSelection = (clickedMenu) => {

        let items = [];
        let menuSections = restaurantMenu["sections"];
        let sectionIndex = -1;
        menuSections.map((section, index) => {

            console.log({section});
            if(section.name === clickedMenu){
                items = section["items"];
                sectionIndex = index;
            }
        });

        console.log(items);
        setSelectedSection(clickedMenu);
        setSelectedSectionIndex(sectionIndex);
        setSelectedItemIndex(-1);
        setSelectedOptionIndex(-1);
        setSelectedChoiceIndex(-1);
        setMenuItems(items);
        setItemOptions([]);
        setOptionChoices([]);
    }

    const handleItemSelection = (clickedItem) => {

        let options = [];
        console.log(menuItems);

        let itemIndex = -1;
        menuItems.map((item, index) => {

            console.log({item});
            if(item.title === clickedItem){
                options = item["options"];
                itemIndex = index;
            }
        });

        console.log(options);
        setSelectedItem(clickedItem);
        setSelectedItemIndex(itemIndex);
        setSelectedOptionIndex(-1);
        setSelectedChoiceIndex(-1);
        setItemOptions(options);
        setOptionChoices([]);
    }

    const handleOptionSelection = (clickedOption) => {

        let choices = [];
        console.log(itemOptions);

        let optionIndex = -1;
        itemOptions.map((option, index) => {

            console.log({option});
            if(option.name === clickedOption){
                choices = option["choices"];
                optionIndex = index;
            }
        });

        console.log(choices);
        setSelectedOption(clickedOption);
        setSelectedOptionIndex(optionIndex);
        setSelectedChoiceIndex(-1);
        setOptionChoices(choices);
    }

    const handleChoiceSelection = (clickedChoice) => {

        
        let choiceIndex = -1;
        optionChoices.map((choice, index) => {

           
            if(choice.name === clickedChoice){
                choiceIndex = index;
            }
        });

        //console.log(choices);
        //setSelectedOption(clickedOption);
        //setSelectedOptionIndex(optionIndex);
        setSelectedChoiceIndex(choiceIndex);
        //setOptionChoices(choices);
    }

    const handleInputChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
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
        let index = -1;
        switch (sectionType){
            case TYPE.SECTION :
                let newSection = {
                    "name" : newValue,
                    "items": []
                }
                restaurantMenuCopy["sections"].push(newSection);
                console.log(restaurantMenuCopy);
                setRestaurantMenu(restaurantMenuCopy);
                break;
            case TYPE.ITEM:
                let newItem = {
                    "title" : newValue,
                    "options": []
                }

                restaurantMenuCopy["sections"][selectedSectionIndex]["items"].push(newItem);
                // console.log(restaurantMenuCopy);
                setRestaurantMenu(restaurantMenuCopy);
                setMenuItems(restaurantMenuCopy["sections"][selectedSectionIndex]["items"]);
                break;
            case TYPE.OPTION:
                let newOption = {
                    "name" : newValue,
                    "choices": []
                }

                restaurantMenuCopy["sections"][selectedSectionIndex]["items"][selectedItemIndex]["options"].push(newOption);
                console.log(restaurantMenuCopy);
                setRestaurantMenu(restaurantMenuCopy);
                setMenuItems(restaurantMenuCopy["sections"][selectedSectionIndex]["items"]);
                setItemOptions(restaurantMenuCopy["sections"][selectedSectionIndex]["items"][selectedItemIndex]["options"]);
                break;
            case TYPE.CHOICE:
                let newChoice = {
                    "name" : newValue,
                }

                restaurantMenuCopy["sections"][selectedSectionIndex]["items"][selectedItemIndex]["options"][selectedOptionIndex]["choices"].push(newChoice);
                console.log(restaurantMenuCopy);
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
                        return <Card key={section.name} selected={i === selectedSectionIndex}  cardText={section.name} customClick={() => handleMenuSelection(section.name)} />
                    })
                }
            </Fragment>
        );
    }

    const renderItemSection = (items) => {

        console.log("items");
        if(items && items.length)
        {
            return (

                <Fragment>
                    {
                        items.map((item,i) => {
                            console.log(item);
                            return <Card key={item.title} selected={i === selectedItemIndex}  cardText={item.title} customClick={() => handleItemSelection(item.title) }/>
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
                            return <Card cardText={option.name} selected={i === selectedOptionIndex} customClick={() => handleOptionSelection(option.name)}/>
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
                            return <Card cardText={optionChoice.name} selected={i === selectedChoiceIndex} customClick={() => handleChoiceSelection(optionChoice.name)}/>
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