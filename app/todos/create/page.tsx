'use client'
import React,{ useState } from 'react';
import Parse from 'parse';
import {Input, Button} from "antd";
import ParseProvider from "@/Providers/ParseProvider/ParseProvider";
import swal from 'sweetalert';
import LogoutButton from "@/Components/LogoutButton/LogoutButton";

interface propTypes {}

const CreateTodoPage: React.FC<propTypes> = () => {
    const [title, setTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    ParseProvider({});

    const createTodo = () => {
        setIsLoading(true);
        const todo = new Parse.Object('ToDo');
        todo.set('title', title);
        todo.set('done', false);
        todo.save().then(
            (result) => {
                swal({
                    title: "Success!",
                    text: "ToDo Item Created Successfully!!",
                    icon: "success",
                });
                setTitle("");
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                swal ( "Oops" ,  "Something went wrong!" ,  "error" );
            }
        );

    }

    return (
        <>
            <LogoutButton/>
            <div className="container">
                <div className="form_container">
                    <div className="form-group">
                        <label htmlFor="title">Create Todo Item</label>
                        <Input style={{margin: "1rem 0 1rem 0"}} type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <Button loading={isLoading} type="primary" onClick={createTodo}>Create</Button>
                    <Button style={{marginTop: "1rem"}} onClick={() => window.open('/todos/view', '_blank')} type="primary">
                        View Live Todos
                    </Button>
                </div>

            </div>
        </>
    );
}

export default CreateTodoPage;