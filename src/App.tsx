import React, { useState } from 'react';
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap';

interface ITodo {
	name: string;
	isComplete: boolean;
}

interface a {
	id: number;
	data: ITodo;
	todos: ITodo[];
	setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoCard = (props: a) => {
	return (
		<div style={{ margin: '10px' }}>
			<button
				style={{
					boxShadow: '2px 4px 6px 1px rgba(0,0,0,0.2)',
					borderRadius: '5px',
					backgroundColor: 'white',
					border: 'none',
					padding: '10px',
					textDecoration: props.data.isComplete ? 'line-through' : '',
				}}
				onClick={(e) => {
					e.preventDefault();
					const temp = [...props.todos];
					temp[props.id].isComplete = !props.data.isComplete;
					props.setTodos(temp);
					console.log(temp);
				}}>
				{props.data.name}
			</button>
		</div>
	);
};

const App = () => {
	const [todo, setTodo] = useState<ITodo>({ name: '', isComplete: false });
	const [todos, setTodos] = useState<Array<ITodo>>([]);

	const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setTodos([...todos, todo]);
		setTodo({ name: '', isComplete: false });
	};

	const InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setTodo({ name: e.target.value, isComplete: false });
	};

	return (
		<div style={{ width: '50vw', margin: '50px auto' }}>
			<h1 style={{ textAlign: 'center' }}>Todo List</h1>
			<div style={{}}>
				<Form onSubmit={SubmitHandler} style={{ display: 'flex' }}>
					<FormControl as='input' placeholder='New Todo' onChange={InputChangeHandler} value={todo.name} />
					<Button>Add</Button>
				</Form>
			</div>

			<div
				style={{
					marginTop: '20px',
					border: todos.length > 0 ? '1px solid black' : '',
					borderRadius: '5px',
					padding: '10px',
				}}>
				<ul>
					{todos.map((elm, k) => (
						<TodoCard key={k} data={elm} todos={todos} setTodos={setTodos} id={k} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
