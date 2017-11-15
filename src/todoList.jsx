import React from 'react';
var newObj= {
    editText:'',
    editPriority:''
}
export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
    
    this.changeTodo = this.changeTodo.bind(this);
    this.handleEditTodoChange = this.handleEditTodoChange.bind(this);
    this.handleEditTodoSave = this.handleEditTodoSave.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);

    }
    changeTodo(e){
        e.preventDefault();
        
        var id = e.target.id;

        let array = this.props.data.data;
        for(let i = 0; i < array.length;i++){
            if(array[i].id == id ){
                 array[i].editEnabled = true;
            }
        }
        this.props.handleEditTodo(array);
    }
    handleEditTodoChange(e){
        e.preventDefault();
        newObj[e.target.name]= e.target.value;
    }

    handleEditTodoSave(e){
        e.preventDefault();
        var id = e.target.id;

        let array = this.props.data.data;
        for(let i = 0; i < array.length;i++){
            if(array[i].id == id ){
                 array[i].priority = newObj.editPriority;
                 array[i].editEnabled = false;
                 if(newObj.editText==''){
                    array[i].text = array[i].text;
                 }else{
                    array[i].text = newObj.editText;
                 }
                 
            }
        }
        this.props.handleEditTodo(array);
    }
    handleTodoDelete(e){
        e.preventDefault();
        var id = e.target.id;
        let array = this.props.data.data;
        for(let i = 0; i < array.length;i++){
            if(array[i].id == id ){
                 array.splice(i,1,);
            }
        }
        this.props.handleEditTodo(array);
    }



    render() {
        var status = "alert-success";




        if (this.props.data.data.length === 0) {
            return (<div className="alert-primary p-3 border border-light rounded">
                <h4 className="card-title">Welcome to the Very Simple Todo App!</h4>
                <p className="card-text">Get started now by adding a new todo on the left.</p>
            </div>
            )
        }
        return (
            <div>
                {
                    this.props.data.data.map(data => {
                        
                        
                        if (data.priority == 1) {
                            status = "alert-success";
                        } else if (data.priority == 2) {
                            status = "alert-warning";
                        } else {
                            status = "alert-danger";
                        };

                        if(data.editEnabled == false){
                            return(
                                <form key={data.id} id={data.id} className={status + " p-2 border border-light rounded"}>
                                <div className="form-row">
                                    <div className="col-lg-11 pl-3">
                                        <label className="form-check-label">
                                            <input type="checkbox" className="form-check-input" />
                                            {data.text}
                                        </label>
                                    </div>
                                    <div className="col-lg-1">
                                        <a  className="update-todo" ><i id={data.id} onClick={this.changeTodo} className="fa fa-pencil-square-o" aria-hidden="true"></i></a>

                                        <a  className="delete-todo ml-2"><i id={data.id} onClick={this.handleTodoDelete} className="fa fa-trash-o"></i></a>
                                    </div>
                                </div>
                            </form> 
                            )
                        }
                        return (
                            <form key={data.id} id={data.id} className ={status + " pt-3 px-4 border border-light rounded"}>
                            <div className="form-row">
                              
                                <label className="font-weight-bold" htmlFor="balance">Description</label>
                                      
                                        <textarea className="form-control" id={data.id} rows="5" name="editText" onChange={this.handleEditTodoChange}>{data.text}</textarea>
                              
                            </div>
                               <div className="form-row py-2">
                                 <div className="col-lg-6">
                              <label className="font-weight-bold" htmlFor="selectPriority">Priority</label>
                              <select className="form-control update-todo-priority" name="editPriority" id={data.id} onChange={this.handleEditTodoChange}>
                              <option value="" disabled selected>Select a Priority</option>
                                <option value="1">Low Priority</option>
                                <option value="2">Medium Priority</option>
                                <option value="3">High Priority</option>
                              </select>
                                 </div>
                            </div>
                                 
                                 <div className="form-row py-2">
                                 <div className="col-lg-11">
                                 </div>
                                   <div className="col-lg-1">
                                     <button name="save" type="submit" className="btn btn-success btn-block update-todo" id={data.id} onClick={this.handleEditTodoSave}>Save</button>
                                 </div>
                            </div>
                                 
                          </form>
                        );

                    })
                }
            </div>
        )
    }
}





