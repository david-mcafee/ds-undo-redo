import { useEffect, useState } from "react";
import "../../App.css";

import {
  API,
  DataStore,
  graphqlOperation,
  Predicates,
  // SortDirection,
} from "aws-amplify";
import { Todo, Operation, OperationType } from "../../models";
// import { getTodo, listTodos } from "../../graphql/queries";
import { listTodos } from "../../graphql/queries";
import {
  Button,
  Collection,
  Card,
  Heading,
  Flex,
  Text,
} from "@aws-amplify/ui-react";

type InitialFormState = {
  readonly name: string;
  readonly description: string;
};

const initialTodoState: Array<Todo> = [];
const initialOperationState: Array<Operation> = [];
const initialAPITodoState: Array<Todo> = [];
const initialFormState: InitialFormState = { name: "", description: "" };

const TodoComponent = () => {
  const [todos, setTodos] = useState(initialTodoState);
  const [operations, setOperations] = useState(initialOperationState);
  const [apiTodos, setAPITodos] = useState(initialAPITodoState);
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    getTodos();
  }, []);

  function setinput(key: string, value: string) {
    setFormState({ ...formState, [key]: value });
  }

  // function clearState() {
  //   setTodos([]);
  //   setOperations([]);
  //   setAPITodos([]);
  // }

  async function getTodos() {
    try {
      const _todos = await DataStore.query(Todo);
      if (!_todos) return;
      console.log("Todos", _todos);
      setTodos(_todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function getAPITodos() {
    try {
      const todoData: any = await API.graphql(graphqlOperation(listTodos));
      console.log(todoData);
      const todos = todoData?.data?.listTodos?.items;
      setAPITodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function getOperations() {
    try {
      const _operations = await DataStore.query(Operation);
      // if (!_operations) return;
      console.log("Operations", _operations);
      setOperations(_operations);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAll() {
    getTodos();
    getAPITodos();
    getOperations();
  }

  async function createOperation(
    recordId: string,
    operationType: OperationType
  ) {
    try {
      await DataStore.save(
        new Operation({
          recordId,
          operationType,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function addTodo() {
    try {
      const todo = await DataStore.save(
        new Todo({
          name: formState.name,
          description: formState.description,
        })
      );

      console.log("todo", todo);

      if (!todo) return;

      createOperation(todo.id, OperationType.CREATE);
    } catch (err) {
      console.log("error: ", err);
    } finally {
      getAll();
    }
  }

  async function onDeleteAll() {
    try {
      DataStore.delete(Todo, Predicates.ALL);
      DataStore.delete(Operation, Predicates.ALL);
    } catch (err) {
      console.log("error: ", err);
    } finally {
      getAll();
    }
  }

  async function updateTodo() {
    const [originalTodo] = await DataStore.query(Todo);
    console.log("Original Todo:", originalTodo);

    try {
      const todo = await DataStore.save(
        Todo.copyOf(originalTodo, (updated) => {
          updated.name = `name ${Date.now()}`;
        })
      );

      console.log("Todo updated:", todo);
      getAll();
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  async function deleteTodo(todo: Todo) {
    try {
      if (!todo) return;
      await createOperation(todo.id, OperationType.DELETE);
      await DataStore.delete(todo);
    } catch (err) {
      console.log("error: ", err);
    } finally {
      getAll();
    }
  }

  // TODO:
  // async function undo() {
  //   try {
  //     const operations = await DataStore.query(Operation, Predicates.ALL, {
  //       sort: (s) => s.createdAt(SortDirection.ASCENDING),
  //     });

  //     console.log("Operations:", operations);

  //     const response: any = await API.graphql(
  //       graphqlOperation(getTodo, { id: operations[0].recordId })
  //     );

  //     console.log("Response:", response);

  //     const deletedTodo = response?.data?.getTodo;

  //     console.log("Deleted Todo:", deletedTodo);

  //     const updatedRecord = await DataStore.save(
  //       new Todo({
  //         name: deletedTodo.id,
  //         description: deletedTodo.description,
  //       })
  //     );

  //     console.log("Updated Record:", updatedRecord);

  //     getAll();
  //   } catch (err) {
  //     console.log("error: ", err);
  //   }
  // }

  return (
    <Card width={"100%"} variation={"elevated"}>
      <Flex direction="column" alignItems="center">
        <Card width={"100%"} variation={"elevated"}>
          <Flex direction={"column"} alignItems="center">
            <Heading level={1}>Undo / Redo</Heading>
            <div className="buttons">
              <button onClick={getAll}>Query All</button>
              <button onClick={updateTodo}>Update Last</button>
              <button onClick={onDeleteAll}>Delete All</button>
              {/* TODO: */}
              {/* <button onClick={undo}>Undo</button> */}
            </div>
          </Flex>
        </Card>
        <Card variation={"elevated"}>
          <Flex direction={"column"}>
            <input
              onChange={(event) => setinput("name", event.target.value)}
              value={formState.name}
              placeholder="Name"
            />
            <input
              onChange={(event) => setinput("description", event.target.value)}
              value={formState.description}
              placeholder="Description"
            />
            <button onClick={addTodo}>Create Todo</button>
          </Flex>
        </Card>
        <Flex direction="row">
          <Collection type="list" items={todos} gap="1.5rem">
            {(todo, index) => (
              <Card
                key={todo.id ? todo.id : index}
                padding="1.5rem"
                variation={"elevated"}
              >
                <Heading level={4}>{todo.name}</Heading>
                <Text>{todo.description}</Text>
                <Button
                  loadingText="loading"
                  ariaLabel="Delete"
                  onClick={() => deleteTodo(todo)}
                >
                  Delete
                </Button>
              </Card>
            )}
          </Collection>
          <Collection type="list" items={operations} gap="1.5rem">
            {(operation, index) => (
              <Card
                key={operation.id ? operation.id : index}
                padding="1.5rem"
                variation={"elevated"}
              >
                <Heading level={4}>{operation.recordId}</Heading>
                <Text>{operation.createdAt}</Text>
                <Text>{operation.operationType}</Text>
              </Card>
            )}
          </Collection>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TodoComponent;
