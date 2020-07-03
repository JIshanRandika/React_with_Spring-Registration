import React from 'react';
import {Card, Table, Row, Col, Container, className, ButtonGroup, Button, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faArrowAltCircleUp} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

export default class getAllData extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            shop : [],

        };
        this.shopChange = this.shopChange.bind(this);
        this.submitShop = this.submitShop.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:8080/ishan/shops/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({shop:data});
            });
    };

    deleteShop = (id) =>{
        axios.delete("http://localhost:8080/ishan/shops/"+id)
        // alert("Shop is deleted.")
            .then(responce =>{
               if(responce.data != null){
                   alert("Shop is deleted.")
               }
            });
    };

    findShopByID = (id) =>{
        axios.get("http://localhost:8080/ishan/shops/"+id)
            .then(response =>{
                if(response.data != null){
                    this.setState({
                        id:response.data.id,
                        address:response.data.address,
                        mobileNo:response.data.mobileNo,
                        name:response.data.name
                    });
                }
            });
    };
    // ======update=========
    updateShop= (id) =>{
        const shop = {
            id: this.state.id,
            address: this.state.address,
            mobileNo: this.state.mobileNo,
            name: this.state.name
        };

        axios.put("http://localhost:8080/ishan/shops/"+id,shop)
            .then(response =>{
                if(response.data !=null){
                    this.setState(this.initialState);
                    alert("Shop Update Successfully!!")
                }
            });

    };

    // =======submit======
    initialState = {
        id:'', address:'', mobileNo:'', name:''
    };

    resetshop = () => {
        this.setState(() => this.initialState)
    };

    submitShop = event => {
        event.preventDefault();

        const shop = {
            address: this.state.address,
            mobileNo: this.state.mobileNo,
            name: this.state.name
        };

        axios.post("http://localhost:8080/ishan/shops/submit",shop)
            .then(response =>{
                if(response.data !=null){
                    this.setState(this.initialState);
                    alert("Shop Save Successfully!!")
                }
            })
    };


    shopChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    };



    render() {
        const {address,mobileNo,name} = this.state;
        return (
            <>
                <section className="section section-lg">
                    <Container>
                        <Card>
                            <Card.Header className={"border border-dark bg-dark text-white"}>Shop Register</Card.Header>
                            <Card.Body>
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Mobile Num.</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.shop.length === 0 ?
                                            <tr>
                                                <td colSpan="4">No Shops</td>
                                            </tr>:
                                            this.state.shop.map((shop)=>(
                                                <tr key={shop.id}>
                                                    <td>{shop.id}</td>
                                                    <td>{shop.name}</td>
                                                    <td>{shop.address}</td>
                                                    <td>{shop.mobileNo}</td>

                                                    <td>
                                                        <ButtonGroup>
                                                            <Button size="sm" variant="outline-success" onClick={this.updateShop.bind(this,shop.id)}><FontAwesomeIcon icon={faArrowAltCircleUp}/></Button>
                                                            <Button size="sm" variant="outline-primary" onClick={this.findShopByID.bind(this,shop.id)}><FontAwesomeIcon icon={faEdit}/></Button>
                                                            <Button size="sm" variant="outline-danger" onClick={this.deleteShop.bind(this,shop.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            ))
                                    }


                                    </tbody>


                                </Table>
                            </Card.Body>
                        </Card>


                        {/*=====Text====*/}
                        <Form onReset={this.resetshop} onSubmit={this.submitShop} id="customerFormID">
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autocomplete="off"
                                                  type="text"
                                                  name="name"
                                                  value={name}
                                                  onChange={this.shopChange}
                                                  placeholder="Enter owner name" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={address}
                                        onChange={this.shopChange}
                                        placeholder="Enter address" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mobileNo"
                                        value={mobileNo}
                                        onChange={this.shopChange}
                                        placeholder="Enter Moblie num." />
                                </Form.Group>
                            </Form.Row>


                            <Button variant="success" type="submit">
                                Submit
                            </Button>{'    '}
                            <Button variant="info" type="reset">
                                Reset
                            </Button>{'    '}
                        </Form>
                    </Container>
                </section>
            </>
        );
    }
}