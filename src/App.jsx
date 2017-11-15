import React, { Component } from 'react';
import TodoList from './todoList';

var count = 0;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      createTodoText: '',
      createTodoPriority: '',
      data: []

    })
    this.handleChange = this.handleChange.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);

  }

  handleChange(event) {
    this.setState({

      [event.target.name]: event.target.value,

    })

  }
  submitTodo(e) {
    e.preventDefault();

    count++;

    var task = {
      id: count,
      text: this.state.createTodoText,
      priority: this.state.createTodoPriority,
      editEnabled: false
    };



    this.setState({
      createTodoText: '',
      createTodoPriority: '',
      data: [...this.state.data, task]

    })

  }

  handleEditTodo(newArray){
    
    this.setState({
      data: newArray
    })
  }

  render() 
  
  
  {
    return (
      <div className="container-fluid p-5">
        <h1 className="text-white">Very Simple Todo App</h1>
        <p className="text-white border border-white border-left-0 border-top-0 border-right-0 pb-4">Track all of the things</p>
        <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-4">

            <div className="card">
              <div className="card-header">
                Add New Todo
              </div>
              <div className="card-body">

                <form>

                  <label className="font-weight-bold" htmlFor="create-todo-text">I need to..</label>

                  <textarea className="form-control create-todo-text" id="create-todo-text" rows="5" name="createTodoText" value={this.state.createTodoText} onChange={this.handleChange}></textarea>


                  <div className="form-group">
                    <label className="font-weight-bold" htmlFor="create-todo-priority">How much of a priority is this?</label>
                    <select className="form-control create-todo-priority" name="createTodoPriority" id="create-todo-priority" value={this.state.createTodoPriority} onChange={this.handleChange}>
                      <option value="" disabled selected>Select a Priority</option>
                      <option value="1">Low</option>
                      <option value="2">Medium</option>
                      <option value="3">High</option>
                    </select>
                  </div>
                </form>

              </div>
              <div className="card-footer">
                <button name="add-todo" type="submit" className="btn btn-success btn-block" onClick={this.submitTodo}>Add</button>
              </div>
            </div>

          </div>
          <div className="col-sm-8 col-md-8  col-lg-8 ">

            <div className="card">
              <div className="card-header">
                View Todos
              </div>

              
                  <TodoList
                   data = {this.state}
                   handleEditTodo ={this.handleEditTodo}
                  

                  />
                




            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
