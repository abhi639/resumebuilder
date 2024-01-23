import axios from 'axios' // Import Axios or your preferred HTTP client library
import {Role, Technology} from './reducer'
import {DefaultRootState} from 'react-redux'
import {
  ADD_TECHNOLOGY_SUCCESS,
  DELETE_TECHNOLOGY_SUCCESS,
  FETCH_TECHNOLOGY_SUCCESS,
  UPDATE_TECHNOLOGY_SUCCESS,
} from './constant'

const API_URL = process.env.REACT_APP_API_URL || 'api'
// Action types
// actions.ts

// Action types for technology

// Action creators
// redux/types.ts (or a similar file)

export interface RootState extends DefaultRootState {
  role: {
    roles: any[] // Define the type of roles array as appropriate
    technology: any[] // Define the type of technology array as appropriate
    // Add other properties related to 'role' here
  }
}

export const fetchRolesSuccess = (roles: Role[]) => ({
  type: FETCH_TECHNOLOGY_SUCCESS,
  roles,
})

export const addRoleSuccess = (role: Role) => ({
  type: ADD_TECHNOLOGY_SUCCESS,
  role,
})

export const updateRoleSuccess = (role: Role) => ({
  type: UPDATE_TECHNOLOGY_SUCCESS,
  role,
})

export const deleteRoleSuccess = (roleId: number) => ({
  type: DELETE_TECHNOLOGY_SUCCESS,
  roleId,
})

export const addTechnologySuccess = (technology: Technology) => ({
  type: ADD_TECHNOLOGY_SUCCESS,
  technology,
})

// Action creator for fetching roles from the backend
export const fetchRoles = () => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${API_URL}admin/api/roles/list`) // Replace with your API endpoint
      const roles = response.data
      dispatch(fetchRolesSuccess(roles))
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }
}

// Action creator for adding a new role
export const addRole = (role: any) => {
  console.log(role.name)
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`${API_URL}admin/api/roles/add`, role.name)
      console.log(role) // Replace with your API endpoint
      const addedRole = response.data
      dispatch(addRoleSuccess(addedRole))
    } catch (error) {
      // Handle error, e.g., dispatch an error action
      console.error('Error adding role:', error)
    }
  }
}

// Action creator for updating a role
export const updateRole = (role: Role) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.put(`${API_URL}admin/api/roles/edit`, role) // Replace with your API endpoint
      const updatedRole = response.data
      dispatch(updateRoleSuccess(updatedRole))
    } catch (error) {
      // Handle error, e.g., dispatch an error action
      console.error('Error updating role:', error)
    }
  }
}

// Action creator for deleting a role
export const deleteRole = (roleId: number) => {
  return async (dispatch: any) => {
    try {
      await axios.delete(`${API_URL}admin/api/roles/delete`) // Replace with your API endpoint
      dispatch(deleteRoleSuccess(roleId))
    } catch (error) {
      // Handle error, e.g., dispatch an error action
      console.error('Error deleting role:', error)
    }
  }
}
// Action creator for adding a new technology
export const addTechnology = (technologyData: any) => {
  return (dispatch: (arg0: { type: (technologyData: any) => (dispatch: any) => void; payload: any }) => void) => {
    // Make an API call to add the new technology
    // Replace the placeholder API call with your actual API call
    fetch('api/technologies/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(technologyData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Dispatch the action to update the state with the added technology
        dispatch({
          type: addTechnology,
          payload: data, // Assuming that the response contains the added technology data
        });
      })
      .catch((error) => {
        console.error('Error adding technology:', error);
        // Handle any error scenarios appropriately
      });
  };
};
