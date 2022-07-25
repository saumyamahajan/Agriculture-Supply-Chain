//import React from "react";

// const Contact = () => {

//     return (
//         <h1>Contact</h1>
//     )

// }

// export default Contact 

import React, { Component } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from '../components/WithRouter';
//import { Redirect } from 'react-router-dom';

class Contact extends Component {
  
  // Nested object
  state = {
   // peopleDetails = {
    name1: '',
    address: {
      colony: 'vaishnav nagar',
      city: '',
      state: 'Rajasthan'
    }
  };

  constructor(props) {
    super(props);
    //this.state.address.city='';
    //this.state.name='';
    this.handleChange = this.handleChange.bind(this);
  }
  
  async componentDidMount() {
    console.log("componentDidMount:")
   // this.props.navigate('home'); 
   //return this.props.navigation.navigate('home') 
   //return <Redirect to='/home' />  
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // Creating a dummy object using spread operator
    //var address = { ...this.state.address }
  
    // Updating the city
    //address.city = 'Kota';
    //address[name] = value;
    //this.setState({ address })

    let obj = { ...this.state }
    
    //obj[name]=value;
    obj.address[name]=value
    this.setState({ obj })
        
  }
  
  render() {
    var val = sessionStorage.getItem("userType");

    return (
      <div style={{ margin: 200 }}>
        {val }
        <h1>{this.state.name1}</h1>
        <h1>{this.state.address.colony} {","}
          {this.state.address.city}{", "}
          {this.state.address.state}</h1>
        <button
          onClick={this.handleChange}
        >UpdateCity </button>

      <Form >            
            <FormGroup>
                <Label for="city">city</Label>
                <Input type="text" name="city" id="city"  value={this.state.address.city || ''}
                        onChange={this.handleChange} 
                        />
            </FormGroup>
            <FormGroup>
                <Label for="name1">name</Label>
                <Input type="text" name="name1" id="name1"  value={this.state.name1 || ''}
                        onChange={this.handleChange} 
                        />
            </FormGroup>
      </Form>
      </div>
    );
  }
}
  
export default withRouter(Contact);