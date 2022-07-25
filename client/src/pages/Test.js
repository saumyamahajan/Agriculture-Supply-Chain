import React from 'react';

// testing
    class Test extends React.Component {   
  
    //user={
    state = {   
      //  user:{
    username: '',
    email: '',
        address: {
        state: '',
        city: '',
        geolocation: {
            lat: '',
            long: ''
        }
        }
    //}
};


 constructor(props) {
    super(props)
   //this.state = {user : this.user};
   
    
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

   onChange (e) {
    let data = { ...this.state };
    let name = e.target.name;
    let val = e.target.value;
    if (name == 'username' || name == 'email') {
      data = { ...data, [name]: val };
    } else if (name == 'state' || name == 'city') {
      data = {
        ...data,
        address: {
          ...data.address,
          [name]: val
        }
      };
    } else if (name == 'lat' || name == 'long') {
      data = {
        ...data,
        address: {
          ...data.address,
          geolocation: {
            ...data.address.geolocation,
            [name]: val
          }
        }
      };
    }
    
    this.setState(data);
  };

  submit(e){
    e.preventDefault();
    console.log(JSON.stringify(this.state));
  };

  render() {
  // let {user} =this.state; 
  return (
    <div>
      <form action="">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            name="email"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="State"
            name="state"
            value={this.state.address.state}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            name="city"
            value={this.state.address.city}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Latitude"
            value={this.state.address.geolocation.lat}
            name="lat"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Longitude"
            value={this.state.address.geolocation.long}
            name="long"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.submit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
}
export default Test 