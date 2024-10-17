import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface TodoProps {
  todo: Todo[];
  onTodoClick: (todo: Todo) => void;
  activeTodoId: number | null;
  setActiveTodoId: (id: number) => void;
}

export const TodoList: React.FC<TodoProps> = ({
  todo,
  onTodoClick,
  activeTodoId,
  setActiveTodoId,
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
        {todo.map(t => (
          <tr
            data-cy="todo"
            className={cn('', {
              'has-background-info-light': activeTodoId === t.id,
            })}
            key={t.id}
            onClick={() => setActiveTodoId(t.id)}
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
                onClick={() => onTodoClick(t)}
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
