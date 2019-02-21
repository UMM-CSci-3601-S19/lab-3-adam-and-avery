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
  // The rest of the todos placed here.

  constructor(private todoListService: TodoListService) {

  }

  public filterTodos(searchCategory: string): Todo[] {

    this.filteredTodos = this.todos;

    // Filter by Category
    if (searchCategory != null) {
      searchCategory = searchCategory.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchCategory || todo.category.toLowerCase().indexOf(searchCategory) !== -1;
      });
    }

    return this.filteredTodos;
  }

  refreshTodos(): Observable<Todo[]> {
    const todos:Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
        this.filterTodos(this.todoCategory);
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

