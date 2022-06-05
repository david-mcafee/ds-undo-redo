// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OperationType = {
  "CREATE": "CREATE",
  "DELETE": "DELETE"
};

const { Todo, Operation } = initSchema(schema);

export {
  Todo,
  Operation,
  OperationType
};