### Demo

![Demo Image](https://na35jw-bn1305.files.1drv.com/y3mGyswl9w0WeoVT3wMfNx9ykzMNviddrOSKdN3RhXkg6ZAeaN8Jy9kJF3t7Si0r0s1oR_MpOCdYT0ZHIMpfraPR0L7O12xn7AhLm0hlH3DwIk1vHP4SVu1tlxugOe5-8KYuC8IsDHzebrHbVGXPeToaBx56-tjVdpo6T7VlYjtGQQ/react-todo-app.gif?psid=1)

### Description

- This repo is used my style guides for Typescript React and Flux Architecture
- This repo is used with **Flux Architecture**. Please read more in https://facebook.github.io/flux/
- This repo is used for testing typescript/react. It may not work in the future.
- This repo is used webpack/babel for building with react jsx

### Install

```
- npm install
- npm install -g http-server
- npm install -g typescript@next
```

### Run

```
- cd to project directory
- npm run watch
- npm run start
```

### Style Guides

#### File Naming and Type
- **File Naming**: All lower case, start with the module you are working, separate by *dash*. Example
  > - todo-page.tsx
  > - todo-list.tsx
  > - todo-item.tsx

- **Code Naming**:
  - **PascalCase** for Class/Module like
  - **camelCase** for function/properties like

  ``` js
    class TodoStore extends BaseStore {
      private _filterText: string;
      private _filterType: FilterType;

      private convertTodosToViewModel(action: TodoAction) {
        let kv: any = action.todos.map(todo => [todo.id, todo]);

        this._todos = new Map<any, Todo>(kv);
        this.emitChange();
      }
    }

  ```

- **Type**
  > - *.tsx for React-Component
  > - *.ts for Non React-Component

#### Private, Public, Static
- **Private**: Private function need to be after Public function, and it needs to have *private* modifier before function name.
- **Public**: No need to define *public* modifier before
- **Static**: Static function or property need to be in the top of class
``` ts
  class TodoCommandButtonsComponent extends React.Component<Props, State> {
    static displayName = "TodoFilterComponent";

  	render() {

  	}

    private handleAddNewClick = (event: any) => {
      let todoText = prompt('What is new Todo ?');

      if (todoText) {
        TodoActions.addTodo(todoText);
      }
    }
  }
```

#### React Component Style Guides
- Attribute of Component start with **on** like *onClick, onChange*
- Callback function start with **handle** like *handleAddNewClick, handleInputChange*
- Need to separate each attribute to new line.
``` js
  return (
    <div className="todo-command-buttons">
      <button
        className="add-new-button"
        onClick={this.handleAddNewClick}
      >
        Add New Todo
      </button>
    </div>
  );
```
- State and Props need to have a specific **interface** with correct **type**
``` ts
  interface State {
    todos: Todo[];
    filterText: string;
    filterType: FilterType;
  }

  interface Props extends React.Props<any> {
    key: string;
    style: any;
    todo: Todo;
  }
```

#### React Constants
- Use **keymirror** libs
- Start with the module with all upper case

``` js
  import keyMirror from "keymirror";

  export default keyMirror({
    TODO_LOAD_COMPLETE: null,
    TODO_CHANGE_EVENT: null,
    TODO_FILTER_TEXT: null,
    TODO_FILTER_TYPE: null,
    TODO_TOGGLE: null,
    TODO_TOGGLE_ALL: null,
    TODO_REMOVE: null,
    TODO_ADD: null,
    TODO_CLEAR_COMPLETED: null
  });
```

#### Flux Stores
- Use **handle** decorator for subscribing events
``` ts
  @handle(TodoConstants.TODO_LOAD_COMPLETE)
  private convertTodosToViewModel(action: TodoAction) {
    let kv: any = action.todos.map(todo => [todo.id, todo]);

    this._todos = new Map<any, Todo>(kv);
    this.emitChange();
  }
```
- Use **private** and **get** for state properties

``` ts
  class TodoStore extends BaseStore {
    private _todos: Map<string, Todo> = new Map<string, Todo>();

    get todos() {
      return [...this._todos.values()]
        .filter(todo =>
          todo.text.toUpperCase().indexOf(this._filterText.toUpperCase()) >= 0 &&
          (this._filterType === FilterType.COMPLETED && todo.isDone ||
          this._filterType === FilterType.ACTIVE && !todo.isDone ||
          this._filterType === FilterType.ALL)
        );
    }
  }
```
