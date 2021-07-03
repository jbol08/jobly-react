import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "./Api";
import UserContext from "./UserContext";
import useTimedMessage from './hooks/useTimedMessage';

function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
	const INITIAL_STATE = {
		username  : currentUser.username,
		email     : currentUser.email,
		firstName : currentUser.firstName,
		lastName  : currentUser.lastName,
		password  : ''
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [ formErrors, setFormErrors ] = useState([]);
	const [ updated, setUpdated ] = useTimedMessage();
      
      /** Handle form data changing */
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(formData => ({
          ...formData,
          [name]: value,
        }));
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        let updatedUser;
        let updateData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        };
    
        let username = formData.username;        
    
        try {
          updatedUser = await JoblyApi.saveProfile(username, updateData);
        } catch (errors) {
          console.error(formErrors);
          setFormErrors(formErrors);
          return;
        }
    
        
        setFormErrors([]);
        setUpdated(true);    
        setCurrentUser(updatedUser);
      }
    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          <h3>Profile</h3>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Username</label>
                  <p className="form-control-plaintext">{formData.username}</p>
                </div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm password to make changes:</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>
  
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}  
                {updated
                    ?
                    <Alert type="success" messages={["Updated successfully."]} />
                    : null}
  
                <button className="btn btn-primary btn-block mt-4" onClick={handleSubmit}>
                  Submit Changes
                </button>
              </form>
            </div>
          </div>
        </div>
    );
  }
  
  export default ProfileForm;
  