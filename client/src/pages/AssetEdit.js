import React, { Component } from 'react';
import { withRouter } from '../components/WithRouter';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

class assetEdit extends Component {

    state = {
    _id: '',
    activityId : this.props.params.activityId,
    farmerId: this.props.params.farmerId,
    asset: {
        assetId:'',
        assetName: '',
        assetDriver: '',
        assetDetails: '',
        assetWages : ''
    }
  };
    constructor(props) {
        super(props);
        //this.state = {state : this.state};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      
    };

    async componentDidMount() {
        let assetId = this.props.params.assetId;
        //const {state} = this.state; 
        console.log("asset id : " + assetId);
        console.log("activityId in asset : " + this.state.activityId)
        if(assetId !== 'new'){
            fetch('/api/activity/asset/'+ this.state.activityId + "/" + assetId)
            .then(res => res.json())
            .then(res => {
                 console.log("res : "+ res[0].asset.assetName)
                // console.log("wsj:"+ res[0].farmerId + " / " + res[0]._id);
                // this.setState = ({this.state.farmerId: res[0].farmerId}); 
                // this.setState({...peopleDetailsthis.state, farmerId: res[0].farmerId});
                this.setState(res[0]); 
                console.log("tytey" + this.state.farmerId + " / " + this.state._id + " / " + this.state.asset.assetName);
            })
        }
        
    };

    async handleSubmit(event) {
        event.preventDefault();
        //const {peopleDetails} = this.state;
        console.log("this.state : farmerID :  " + this.state.farmerId);
        console.log("this.state : activityId :  " + this.state._id);
        await fetch('/api/activity/asset/' + (this.state.asset.assetId ?  this.state._id + "/" + this.state.asset.assetId : this.state.activityId), {
            //await fetch('/api/activity/' + peopleDetails.activityId, {
            method: (this.state.asset.assetId) ? 'PUT' : 'POST',
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
            asset: {
            ...data.asset,
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
                <h1>{this.state.asset.assetId ? "AssetEdit" : "AssetAdd"}</h1>
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="assetName">Asset Name</Label>
                        <Input type="text" name="assetName" id="assetName"  value={this.state.asset.assetName || ''}
                               onChange={this.handleChange} 
                               //autoComplete="assetName"
                               />
                    </FormGroup>
                    <FormGroup>
                        <Label for="assetDriver">Asset Driver</Label>
                        <Input type="text" name="assetDriver" id="assetDriver"  defaultValue={this.state.asset.assetDriver}
                                //onChange={()=>{this._handleChangeEvent(peopleDetails.people.assetDriver);}}
                               onChange={this.handleChange} 
                               //autoComplete="assetDriver"
                               />
                    </FormGroup>
                    <FormGroup>
                        <Label for="assetDetails">Asset Details</Label>
                        <Input type="text" name="assetDetails" id="assetDetails"  defaultValue={this.state.asset.assetDetails}
                                //onChange={()=>{this._handleChangeEvent(peopleDetails.people.assetDetails);}}
                               onChange={this.handleChange} 
                               //autoComplete="assetDetails"
                               />
                    </FormGroup> 
                    <FormGroup>
                        <Label for="assetWages">Asset Wages</Label>
                        <Input type="number" name="assetWages" id="assetWages"  defaultValue={this.state.asset.assetWages}
                               // onChange={()=>{this._handleChangeEvent(peopleDetails.people.assetWages);}}
                               onChange={this.handleChange} 
                               //autoComplete="assetWages"
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

export default withRouter(assetEdit)

