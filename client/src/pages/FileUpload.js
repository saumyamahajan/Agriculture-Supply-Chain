import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class FileUpload extends Component {
   state={
    activityProof:'',
    dat:''
   }

   constructor(props) {
    super(props);
   }

    handleFileChange = e => {
   // this.setState({ file: e.target.files[0] });
   this.setState({activityProof: e.target.files[0] }); 
  };

  handleChange = e => {
   //this.setState({ text: e.target.value });
    this.setState({ dat: e.target.value }); 
  };


 

  upload = () => {
    if (this.state.activityProof) {
      let formData = new FormData();
      formData.append("activityProof", this.state.activityProof);
      formData.set("dat", this.state.dat);

     




      //  axios.post("/upload", formData, {    
          axios.post("/api/activity", formData, {    
        })
      .then(res => { 
        console.log(res.statusText)
      })
    }
  };

  render() {
    return (
      <div>
        <input type="text"  name="dat" onChange={this.handleChange} />
        <br></br>
        <input type="file" name="activityProof" onChange={this.handleFileChange} />
        <input type="button" onClick={this.upload} value="Upload" />
      </div>
    );
  }
}


export default FileUpload;