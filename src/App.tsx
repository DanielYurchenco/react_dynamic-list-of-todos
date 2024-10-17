/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getActive, getComplited, getTodos } from './api';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);

  const handleSelectChange = useCallback((newValue: string) => {
    setFilter(newValue);
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  const openModal = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleClickId = useCallback((todoId: number) => {
    setActiveTodoId(todoId);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      let data: Todo[] = [];

      if (filter === 'all') {
        data = await getTodos();
      } else if (filter === 'completed') {
        data = await getComplited();
      } else {
        data = await getActive();
      }

      setTodos(data);
      setIsLoading(false);
    };

    fetchData();
  }, [filter]);

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelectChange={handleSelectChange}
                query={query}
                handleQueryChange={handleQueryChange}
                clearQuery={clearQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && todos.length > 0 && (
                <TodoList
                  todo={filteredTodos}
                  onTodoClick={openModal}
                  activeTodoId={activeTodoId}
                  setActiveTodoId={handleClickId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </>
  );
};
