// reducers.ts

import { combineReducers } from 'redux';
import { ADD_TECHNOLOGY_SUCCESS, DELETE_TECHNOLOGY_SUCCESS, FETCH_TECHNOLOGY_SUCCESS, UPDATE_TECHNOLOGY_SUCCESS } from './constant';
import { JSXElementConstructor, ReactElement, ReactNodeArray } from 'react';

export interface Role {
  name: string | number | boolean | {} | ReactElement<any, string | JSXElementConstructor<any>> | ReactNodeArray | null | undefined;
  id: number;
  // Add other role properties here
}

export interface Technology {
  name: string;
  id: number;
  // Add other technology properties here
}

const rolesReducer = (state: Role[] = [], action: any) => {
  switch (action.type) {
    case FETCH_TECHNOLOGY_SUCCESS:
      return action.roles;
    case ADD_TECHNOLOGY_SUCCESS:
      return [...state, action.role];
    case UPDATE_TECHNOLOGY_SUCCESS:
      return state.map((role) =>
        role.id === action.role.id ? action.role : role
      );
    case DELETE_TECHNOLOGY_SUCCESS:
      return state.filter((role) => role.id !== action.roleId);
    default:
      return state;
  }
};

const technologyReducer = (state: Technology[] = [], action: any) => {
  switch (action.type) {
    case FETCH_TECHNOLOGY_SUCCESS:
      return action.technology;
    case ADD_TECHNOLOGY_SUCCESS:
      return [...state, action.technology];
    case UPDATE_TECHNOLOGY_SUCCESS:
      return state.map((tech) =>
        tech.id === action.technology.id ? action.technology : tech
      );
    case DELETE_TECHNOLOGY_SUCCESS:
      return state.filter((tech) => tech.id !== action.technologyId);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  roles: rolesReducer,
  technology: technologyReducer, // Add the technology state
});

export default rootReducer;
