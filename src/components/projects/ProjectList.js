// components/projects/ProjectList.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AddProject from './AddProject'; // <== !!!

class ProjectList extends Component {
	state = { 
    listOfProjects: [] 
  };

  getAllProjects = () => {
    axios.get(`${process.env.REACT_APP_API_URL}api/projects`, { withCredentials: true})
      .then((apiResponse) => {
        this.setState({ listOfProjects: apiResponse.data })
      })
  }

  componentDidMount() {
    //  fetch the data from API befor initial render
    this.getAllProjects();  
  }

  render() {
    const { listOfProjects } = this.state;

    return(
      <div>         {/* After adding a projects,we will GET all projects again from API  */}
        <AddProject getData={this.getAllProjects} />   
        <div>
          { 
            listOfProjects.map( (project) => {
            return (
              <div key={project._id} className='project'>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                  <p>{project.description} </p>
                </Link>
              </div>
            )})
          }
        </div>

      </div>
    )
  }
}

export default ProjectList;