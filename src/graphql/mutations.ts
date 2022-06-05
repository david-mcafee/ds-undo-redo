/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createOperation = /* GraphQL */ `
  mutation CreateOperation(
    $input: CreateOperationInput!
    $condition: ModelOperationConditionInput
  ) {
    createOperation(input: $input, condition: $condition) {
      id
      recordId
      operationType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateOperation = /* GraphQL */ `
  mutation UpdateOperation(
    $input: UpdateOperationInput!
    $condition: ModelOperationConditionInput
  ) {
    updateOperation(input: $input, condition: $condition) {
      id
      recordId
      operationType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteOperation = /* GraphQL */ `
  mutation DeleteOperation(
    $input: DeleteOperationInput!
    $condition: ModelOperationConditionInput
  ) {
    deleteOperation(input: $input, condition: $condition) {
      id
      recordId
      operationType
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
