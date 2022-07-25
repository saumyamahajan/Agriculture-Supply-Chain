import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from '../components/WithRouter';

class Farmer extends Component {

    constructor(props) {
        super(props);
        this.state = {farmers: []};
    }

    componentDidMount() {
        var val = sessionStorage.getItem("userType");
        console.log("type : " + val);
        if(val === 'admin'){
            console.log("admin");
            fetch('/api/farmer')
            .then(response => response.json())
            .then(data => this.setState({farmers: data}));
        }
        else{
            const user = sessionStorage.getItem("userName");
            console.log("user : " + user);
            fetch('/api/farmer/' + "62c17af5a30d96aa6579ede9")
            .then(response => response.json())
            .then(data => this.setState({farmers: data}));
        }
    }

    async remove(id) {
        console.log("delete id : " + id);
        await fetch(`/api/farmer/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
             let updatedFarmers = [...this.state.farmers].filter(i => i._id !== id);
            // setTodos(todos.filter((todo) => todo.id !== id));
             this.setState({farmers: updatedFarmers});
        });

       // this.props.navigate('/farmer');
    }

    render() {
        const {farmers} = this.state;

        const farmerList = farmers.map(farmer => {
            return <tr key={farmer._id}>
                <td>{farmer.name}</td>
                <td>{farmer.district}</td>
                <td>{farmer.contact}</td>
                <td>{farmer.landMapping}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/farmer/" + farmer._id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(farmer._id)}>Delete</Button>
                        <Button size="sm" color="dark" tag={Link} to={"/farmerProfile/" + farmer._id}>Profile</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
            <h1>Farmers</h1>
                <Container>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/farmer/new">Add Farmer</Button>
                </div>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="25%">Name</th>
                            <th width="25%">District</th>
                            <th width="25%">Contact</th>
                            <th width="25%">landMapping</th>
                        </tr>
                        </thead>
                        <tbody>
                        {farmerList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
            
    }

}

export default withRouter(Farmer)