import React, { useEffect, useState } from 'react';
import { Role } from '../../../setup/otherredux/reducer';
import axios from 'axios'; // Import Axios
import { fetchRolesSuccess } from '../../../setup/otherredux/Action';

interface YourComponentProps {
  roles: Role[]; // Define the type of your roles here
  fetchRoles: () => void;
  addRole: (role: Role) => void;
  updateRole: (role: Role) => void;
  deleteRole: (roleId: number) => void;
}

const fetchRolesFromBackend = async () => {
    try {
      const response = await axios.get('/admin/api/roles/list'); 
      const roles = response.data; // Assuming your API response contains role data
      fetchRolesSuccess(roles); // Dispatch the success action
    } catch (error) {
      // Handle errors here, e.g., dispatch an error action
      console.error('Error fetching roles:', error);
    }
  };
const YourComponent: React.FC<YourComponentProps> = ({
  roles,
  fetchRoles,
  addRole,
  updateRole,
  deleteRole,
}) => {
  // Local state to manage form inputs
  const [newRoleName, setNewRoleName] = useState('');

  useEffect(() => {
    // Fetch roles when the component mounts
    fetchRoles();
  }, [fetchRoles]);

  const handleAddRole = () => {
    // Create a new role object with the input value
    const newRole: Role = {
      id: Math.random(), 
      name: newRoleName,
    };

    // Add the new role to the Redux store
    addRole(newRole);

    // Clear the input field
    setNewRoleName('');
  };

  const handleUpdateRole = (role: Role) => {
    // Update the selected role in the Redux store
    updateRole(role);
  };

  const handleDeleteRole = (roleId: number) => {
    // Delete the selected role from the Redux store
    deleteRole(roleId);
  };

  return (
    <div>
      {/* Input for adding a new role */}
      <input
        type="text"
        value={newRoleName}
        onChange={(e) => setNewRoleName(e.target.value)}
      />
      <button onClick={handleAddRole}>Add Role</button>

      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name}
            <button onClick={() => handleUpdateRole(role)}>Update</button>
            <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
