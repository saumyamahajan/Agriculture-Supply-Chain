import React, { Component } from 'react';
import { withRouter } from '../components/WithRouter';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

class ActivityEdit extends Component {
   // activityDetails = {
    state = {
        _id : '',
        farmerId : this.props.params.farmerId,
        name: '',
        startDate: '',
        endDate: '',
        activityProof: '',
        proof: ''
       
        // people : [],  
        // asset : [], 
        // material : []
    };

    constructor(props) {
        super(props);
       // this.state = {activityDetails : this.activityDetails};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    };

    async componentDidMount() {
        let activityId = this.props.params.id;
        console.log("activity id : " + activityId);
        if(activityId !== 'new'){
            fetch('/api/activity/1/'+ activityId)
            .then(res => res.json())
            .then(res => {
                console.log(res[0])
                //this.setState({activityDetails: res[0]}); 
                this.setState(res[0]); 
                this.setState({proof : this.state.activityProof}); 
            })
        }
        
    };

    // async handleSubmit(event) {
       
    //     event.preventDefault();
    //     const {activityDetails} = this.state;
    //     console.log("activityDetails : " + activityDetails._id);
    //     await fetch('/api/activity/' + (activityDetails._id ?  activityDetails._id : activityDetails.farmerId), {
    //         //await fetch('/api/activity/' + activityDetails.farmerId, {
    //         method: (activityDetails._id) ? 'PUT' : 'POST',
    //         // method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(activityDetails),
    //     });

    //     this.props.navigate('/farmerProfile/' + activityDetails.farmerId);  
        
    // }

    async handleSubmit(event) {
       
        // const form = document.querySelector("form")
        // const formData = new FormData(form);

        const formData = new FormData();

        formData.append('name', this.state.name);
        formData.append('startDate', this.state.startDate);
        formData.append('endDate', this.state.endDate);
        if (this.state.activityProof)
            formData.append('activityProof', this.state.activityProof);
        else 
            formData.append('activityProof', this.state.proof);
        console.log("formData:"+formData.get('activityProof'))
        console.log(formData)
        event.preventDefault();
        const {activityDetails} = this.state;
        //console.log("activityDetails : " + activityDetails._id);
        console.log("activityDetails : " +  this.state._id);
        if(this.state._id) {
            axios.put('/api/activity/' + this.state._id, formData, {   
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                },
                //body: formData
            });
        }
        else {
            axios.post('/api/activity/' + this.state.farmerId, formData, {   
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                },
                //body: formData
            });
        }
        this.props.navigate('/farmerProfile/' + this.state.farmerId);  
        
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        //const name1 = target.name;
       // let activityDetails = {...this.state.activityDetails};
        //let activityDetails = {...this.state};
        //activityDetails[name1] = value;
        // if (name == 'activityProof' ) {
        //     console.log(event.target.files);
        //     activityDetails[name]=event.target.files[0]
        // }
      
        //this.setState({activityDetails});
        //const value = event.target.value;
  this.setState({
    ...this.state,
    [event.target.name]: value
  });
    }

    handleFileChange(e) {
        console.log(e.target.files);
       
        this.setState({activityProof: e.target.files[0] }); 
   
    }


    // onFileUpload = () => { 
    //     console.log("inside fileupload:");
    //     // Create an object of formData 
    //     const formData = new FormData(); 
       
    //     // Update the formData object 
    //     formData.append( 
    //       "myFile", 
    //       this.state.selectedFile 
    //      // this.state.selectedFile.name 
    //     ); 
       
    //     // Details of the uploaded file 
    //     console.log("fileupload:"+this.state.selectedFile); 
       
    //     // Request made to the backend api 
    //     // Send formData object 
    //     //axios.post("api/uploadfile", formData); 
    //   }; 


       

    render() {
        //const {activityDetails} = this.state;
        return (
            <div>
                <h1>{this.state._id ? "ActivityEdit" : "ActivityAdd"}</h1>
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={this.state.name || ''}
                               onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="startDate">StartDate</Label>
                        <Input type="date" name="startDate" id="startDate" value={this.state.startDate }
                               onChange={this.handleChange} autoComplete="startDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="endDate">EndDate</Label>
                        <Input type="date" name="endDate" id="endDate" value={this.state.endDate || ''}
                               onChange={this.handleChange} autoComplete="endDate"/>
                    </FormGroup>
                    <FormGroup>
                    {/* : {this.state.activityProof || ''} */}
                        <Label for="activityProof">ActivityProof : {this.state.proof || ''} </Label> <br></br>
                        <input type="file" name="activityProof" id="activityProof" onChange={this.handleFileChange} />
                        <input type="hidden" name="proof" value={this.state.activityProof || ''} />
                        {/* <button onClick={this.onFileUpload}> Upload! </button>   */}
                        {/* <img src={file} /> */}
                        {/* <Input type="test" name="activityProof" id="activityProof" value={activityDetails.activityProof || ''} 
                               onChange={this.handleChange} autoComplete="activityProof"/> */}
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" >Save</Button>{' '}
                        <Button color="secondary" tag={Link} to={"/farmerProfile/" + this.state.farmerId}>Cancel</Button>
                        {/* <Button color="secondary" onClick={() => navigate(-1)}>Cancel</Button> */}
                    </FormGroup>
                </Form>
               
                </Container>
            </div>
        )
    }

}

export default withRouter(ActivityEdit)

