import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from "rxjs/Observable";
import {FormsModule} from "@angular/forms";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import {CustomModule} from '../custom.module';

import {Todo} from './todo';
import {TodoListComponent} from "./todo-list.component";
import {TodoListService} from "./todo-list.service";

describe('Todo list', () => {

  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach( () => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          _id: 'todo1_id',
          owner: 'Amy',
          status: false,
          body: 'This is Amy\'s todo',
          category: 'software design'
        },
        {
          _id: 'todo2_id',
          owner: 'Bob',
          status: true,
          body: 'This is Bob\'s todo',
          category: 'groceries'
        },
        {
          _id: 'todo3_id',
          owner: 'Celia',
          status: false,
          body: 'This is Celia\'s todo',
          category: 'software engineering'
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(todoList.todos.length).toBe(3);
  });

  it('contains a todo with an owner named Amy', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Amy')).toBe(true);
  });

  it('contains a todo with an owner named Bob', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Bob')).toBe(true);
  });

  it('doesn\'t a todo with an owner named Felicia', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Felicia')).toBe(false);
  });

  it('has two todos that are incomplete', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.status === false).length).toBe(2);
  });

  it('todo list filters by category', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoCategory = 'software';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  });

  it('todo list filters by one body text type exact', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoBody = 'This is Celia\'s todo';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by body all of them', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoBody = 'This is';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(3));
  });

  it('todo list filters by the status of true', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = 'true';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  });

  it('todo list filters by the status of false', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoStatus = 'false';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  })

  it('todo list filters by specific owner', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = 'Celia';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(1));
  })

  it('todo list filters by specific character in owner', () => {
    expect(todoList.filteredTodos.length).toBe(3);
    todoList.todoOwner = 'a';
    const a: Observable<Todo[]> = todoList.refreshTodos();
    a.do(x => Observable.of(x))
      .subscribe(x => expect(todoList.filteredTodos.length).toBe(2));
  })
});

describe('Misbehaving todo list', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach( () => {
    // stub TodoService for test purposes
    todoListServiceStub = {
      getTodos: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule],
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a TodoListService', () => {
    // Since the observer throws an error, we don't expect todos to be defined.
    expect(todoList.todos).toBeUndefined();
  })
});
