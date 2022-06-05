# ds-undo-redo

Undo / Redo with AWS Amplify DataStore

## Schema:

```
# This "input" configures a global authorization rule to enable public access to
# all models in this schema. Learn more about authorization rules here: https://docs.amplify.aws/cli/graphql/authorization-rules
input AMPLIFY {
  globalAuthRule: AuthRule = { allow: public }
} # FOR TESTING ONLY!
type Todo @model {
  id: ID!
  name: String!
  description: String!
}

type Operation @model {
  id: ID!
  recordId: String!
  operationType: OperationType!
}

enum OperationType {
  CREATE
  DELETE
}

```
