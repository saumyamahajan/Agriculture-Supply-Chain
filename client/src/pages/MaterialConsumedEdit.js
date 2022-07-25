import React, { Component } from 'react';
import { withRouter } from '../components/WithRouter';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

class materialConsumedEdit extends Component {

    state = {
    _id: '',
    activityId : this.props.params.activityId,
    farmerId: this.props.params.farmerId,
    material: {
        materialConsumedId:'',
        materialConsumedReceipt: '',
        materialConsumedDetails: '',
    }
  };
    constructor(props) {
        super(props);
        //this.state = {state : this.state};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      
    };

    async componentDidMount() {
        let materialConsumedId = this.props.params.materialConsumedId;
        //const {state} = this.state; 
        console.log("materialConsumed id : " + materialConsumedId);
        console.log("activityId in materialConsumed : " + this.state.activityId)
        if(materialConsumedId !== 'new'){
            fetch('/api/activity/materialConsumed/'+ this.state.activityId + "/" + materialConsumedId)
            .then(res => res.json())
            .then(res => {
                 console.log("res : "+ res[0].material.materialConsumedId)
                // console.log("wsj:"+ res[0].farmerId + " / " + res[0]._id);
                // this.setState = ({this.state.farmerId: res[0].farmerId}); 
                // this.setState({...peopleDetailsthis.state, farmerId: res[0].farmerId});
                this.setState(res[0]); 
                console.log("tytey" + this.state.farmerId + " / " + this.state._id + " / " + this.state.material.materialConsumedReceipt);
            })
        }
        
    };

    async handleSubmit(event) {
        event.preventDefault();
        //const {peopleDetails} = this.state;
        console.log("this.state : farmerID :  " + this.state.farmerId);
        console.log("this.state : activityId :  " + this.state._id);
        await fetch('/api/activity/materialConsumed/' + (this.state.material.materialConsumedId ?  this.state._id + "/" + this.state.material.materialConsumedId : this.state.activityId), {
            //await fetch('/api/activity/' + peopleDetails.activityId, {
            method: (this.state.material.materialConsumedId) ? 'PUT' : 'POST',
            // method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        });

         this.props.navigate('/farmerProfile/' + this.state.farmerId);          
       // this.props.navigate('/' + this.state._id);
    }

    handleChange(e) {
        // not working
        // const target = event.target;
        // const value = target.value;
        // const name = target.name;
        // let peopleDetails = {...this.state.peopleDetails};
        // peopleDetails[name] = value;
        // this.setState({peopleDetails});

        let data = { ...this.state };
        let name = e.target.name;
        let val = e.target.value;
        data = {
            ...data,
            material: {
            ...data.material,
            [name]: val
            }
        };

        this.setState(data);
       
    }

    // handleChange(val) {
    //     return val;
    // }
    // //to handle input change.
    // handleChange(event) {
    //     const {name, value} = event.target
    //     this.setState({
    //         [name]: value
    //     }) 
    // }

    render() {
        //const {peopleDetails} = this.state;
        
        return (
            <div>
                <h1>{this.state.material.materialConsumedId ? "MaterialConsumedEdit" : "MaterialConsumedAdd"}</h1>
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="materialConsumedReceipt">Material Consumed Receipt</Label>
                        <Input type="text" name="materialConsumedReceipt" id="materialConsumedReceipt"  value={this.state.material.materialConsumedReceipt || ''}
                               onChange={this.handleChange} 
                               //autoComplete="materialConsumedReceipt"
                               />
                    </FormGroup>
                    <FormGroup>
                        <Label for="materialConsumedDetails">Material Consumed Details</Label>
                        <Input type="text" name="materialConsumedDetails" id="materialConsumedDetails"  defaultValue={this.state.material.materialConsumedDetails}
                                //onChange={()=>{this._handleChangeEvent(peopleDetails.material.materialConsumedDetails);}}
                               onChange={this.handleChange} 
                               //autoComplete="materialConsumedDetails"
                               />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to={"/farmerProfile/" + this.state.farmerId}>Cancel</Button>
                        {/* <Button color="secondary" onClick={() => navigate(-1)}>Cancel</Button> */}
                    </FormGroup>
                </Form>
                    
                </Container>
            </div>
        )
    }

}

export default withRouter(materialConsumedEdit)


