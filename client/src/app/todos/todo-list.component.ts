import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoCategory: string;
  public todoBody: string;
  public todoStatus: string;
  public todoOwner: string;
  // The rest of the todos placed here.

  constructor(private todoListService: TodoListService) {

  }

  public filterTodos(searchCategory: string, searchBody: string, searchStatus: string, searchOwner: string): Todo[] {

    this.filteredTodos = this.todos;

    // Filter by Category
    if (searchCategory != null) {
      searchCategory = searchCategory.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchCategory || todo.category.toLocaleLowerCase().indexOf(searchCategory) !== -1;
      });
    }

    // Filter by Body text
    if (searchBody != null) {
      searchBody = searchBody.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchBody || todo.body.toLocaleLowerCase().indexOf(searchBody) !== -1;
      });
    }

    // // Filter by Status
    if (searchStatus != null) {
      searchStatus = searchStatus.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchStatus || todo.status.toString().toLocaleLowerCase().indexOf(searchStatus) !== -1;
      });
    }

    // // Filter by Owner
    if (searchOwner != null) {
      searchOwner = searchOwner.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter((todo: Todo) => {
        return !searchOwner || todo.owner.toLocaleLowerCase().indexOf(searchOwner) !== -1;
      });
    }

    return this.filteredTodos;
  }

  refreshTodos(): Observable<Todo[]> {
    const todos:Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
        this.filterTodos(this.todoCategory, this.todoBody, this.todoStatus, this.todoOwner);
      },
      err => {
        console.log(err);
      });
    return todos;
  }

  ngOnInit(): void {
    this.refreshTodos();
  }
}

