import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface TodoProps {
  todos: Todo[];
  openModal: (todo: Todo) => void;
  activeTodoId: number | null;
  onTodoClick: (id: number) => void;
}

export const TodoList: React.FC<TodoProps> = ({
  todos,
  openModal,
  activeTodoId,
  onTodoClick,
}) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>Completed</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {todos.map(t => (
          <tr
            data-cy="todo"
            className={cn('', {
              'has-background-info-light': activeTodoId === t.id,
            })}
            key={t.id}
            onClick={() => onTodoClick(t.id)}
          >
            <td className="is-vcentered">{t.id}</td>
            <td className="is-vcentered">
              {t.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered">{t.title}</td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                onClick={() => openModal(t)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': activeTodoId !== t.id,
                      'fa-eye-slash': activeTodoId === t.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
