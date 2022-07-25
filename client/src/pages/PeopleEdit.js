import React, { Component } from 'react';
import { withRouter } from '../components/WithRouter';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

class peopleEdit extends Component {
   
    // peopleDetails = {
    //     _id : '',  //this is activity id
    //     activityId : this.props.params.activityId,
    //     farmerId : '',
    //     people : []
    //     // peopleName: '',
    //     // peopleWork: '',
    //     // peopleWages: '',
    // };
    // 
    state = {
    _id: '',
    activityId : this.props.params.activityId,
    farmerId: this.props.params.farmerId,
    people: {
        peopleId:'',
        peopleName: '',
        peopleWork: '',
        peopleWages: ''
    }
  };
    constructor(props) {
        super(props);
        //this.state = {state : this.state};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      
    };

    async componentDidMount() {
        let peopleId = this.props.params.peopleId;
        //const {state} = this.state; 
        console.log("people id : " + peopleId);
        console.log("activityId in people : " + this.state.activityId)
        if(peopleId !== 'new'){
            fetch('/api/activity/people/'+ this.state.activityId + "/" + peopleId)
            .then(res => res.json())
            .then(res => {
                 console.log("res : "+ res[0].people.peopleName)
                // console.log("wsj:"+ res[0].farmerId + " / " + res[0]._id);
                // this.setState = ({this.state.farmerId: res[0].farmerId}); 
                // this.setState({...peopleDetailsthis.state, farmerId: res[0].farmerId});
                this.setState(res[0]); 
                console.log("tytey" + this.state.farmerId + " / " + this.state._id + " / " + this.state.people.peopleName);
            })
        }
        
    };

    async handleSubmit(event) {
        event.preventDefault();
        //const {peopleDetails} = this.state;
        console.log("this.state : farmerID :  " + this.state.farmerId);
        console.log("this.state : activityId :  " + this.state._id);
        await fetch('/api/activity/people/' + (this.state.people.peopleId ?  this.state._id + "/" + this.state.people.peopleId : this.state.activityId), {
            //await fetch('/api/activity/' + peopleDetails.activityId, {
            method: (this.state.people.peopleId) ? 'PUT' : 'POST',
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
            people: {
            ...data.people,
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
                <h1>{this.state.people.peopleId ? "PeopleEdit" : "PeopleAdd"}</h1>
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    {/* value={peopleDetails.peopleName || ''} value={peopleDetails.peopleWork || ''}  value={peopleDetails.peopleWages || ''}*/}
                    <FormGroup>
                        <Label for="peopleName">People Name</Label>
                        <Input type="text" name="peopleName" id="peopleName"  value={this.state.people.peopleName || ''}
                               onChange={this.handleChange} 
                               //autoComplete="peopleName"
                               />
                    </FormGroup>
                    <FormGroup>
                        <Label for="peopleWork">People Work</Label>
                        <Input type="text" name="peopleWork" id="peopleWork"  defaultValue={this.state.people.peopleWork}
                                //onChange={()=>{this._handleChangeEvent(peopleDetails.people.peopleWork);}}
                               onChange={this.handleChange} 
                               //autoComplete="peopleWork"
                               />
                    </FormGroup>
                    <FormGroup>
                        <Label for="peopleWages">People Wages</Label>
                        <Input type="number" name="peopleWages" id="peopleWages"  defaultValue={this.state.people.peopleWages}
                               // onChange={()=>{this._handleChangeEvent(peopleDetails.people.peopleWages);}}
                               onChange={this.handleChange} 
                               //autoComplete="peopleWages"
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

export default withRouter(peopleEdit)

