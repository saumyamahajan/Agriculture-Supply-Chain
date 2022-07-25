import React from 'react';
export default function App() {
  const [user, setUser] = React.useState({
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
  });
  const onChange = e => {
    let data = { ...user };
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
    setUser(data);
  };
  const submit = e => {
    e.preventDefault();
    console.log(JSON.stringify(user));
  };
  return (
    <div>
      <form action="">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="State"
            name="state"
            value={user.address.state}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            name="city"
            value={user.address.city}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Latitude"
            value={user.address.geolocation.lat}
            name="lat"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Longitude"
            value={user.address.geolocation.long}
            name="long"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={submit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}