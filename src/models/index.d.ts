import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum OperationType {
  CREATE = "CREATE",
  DELETE = "DELETE"
}



type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OperationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}

export declare class Operation {
  readonly id: string;
  readonly recordId: string;
  readonly operationType: OperationType | keyof typeof OperationType;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Operation, OperationMetaData>);
  static copyOf(source: Operation, mutator: (draft: MutableModel<Operation, OperationMetaData>) => MutableModel<Operation, OperationMetaData> | void): Operation;
}