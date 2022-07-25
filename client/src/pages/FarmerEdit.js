import React, { Component } from 'react';
import { withRouter } from '../components/WithRouter';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

class FarmerEdit extends Component {

    farmerDetails = {
        _id : '',
        name: '',
        district: '',
        contact: '',
        landMapping: ''
    };

    constructor(props) {
        super(props);
        this.state = {farmerDetails : this.farmerDetails};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    async componentDidMount() {
        let id = this.props.params.id;
        console.log("farmer id : " + id);
        if(id !== 'new'){
            fetch('/api/farmer/'+id)
            .then(res => res.json())
            .then(res => {
                console.log(res[0])
                this.setState({farmerDetails: res[0]}); 
            })
        }
        
    };

    async handleSubmit(event) {
        event.preventDefault();
        const {farmerDetails} = this.state;
        console.log("farmerDetails : " + farmerDetails._id);
        await fetch('/api/farmer' + (farmerDetails._id ? '/' + farmerDetails._id : ''), {
            method: (farmerDetails._id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(farmerDetails),
        });

        this.props.navigate('/farmer');          
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let farmerDetails = {...this.state.farmerDetails};
        farmerDetails[name] = value;
        this.setState({farmerDetails});
    }

    //to handle input change.
    // handleChange(event) {
    //     const {name, value} = event.target
    //     this.setState({
    //         [name]: value
    //     }) 
    // }

    render() {
        const {farmerDetails} = this.state;
        return (
            <div>
                <h1>FarmerEdit</h1>
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={farmerDetails.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="district">District</Label>
                        <Input type="text" name="district" id="district" value={farmerDetails.district || ''}
                               onChange={this.handleChange} autoComplete="district"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="contact">Contact</Label>
                        <Input type="number" name="contact" id="contact" value={farmerDetails.contact || ''}
                               onChange={this.handleChange} autoComplete="contact"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="landMapping">LandMapping</Label>
                        <Input type="number" name="landMapping" id="landMapping" value={farmerDetails.landMapping || ''}
                               onChange={this.handleChange} autoComplete="landMapping"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/farmer">Cancel</Button>
                    </FormGroup>
                </Form>
                    
                </Container>
            </div>
        )
    }

}

export default withRouter(FarmerEdit)