import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    text: 'Test with docker!',
    done: false,
  }

  const onClickComplete = () => {
    console.log('completed')
  }

  const onClickDelete = () => {
    console.log('deleted')
  }

  render(
    <Todo
      todo={todo}
      onClickComplete={onClickComplete}
      onClickDelete={onClickDelete}
    />
  )

  const element = screen.getByText('Test with docker!')
  expect(element).toBeDefined()
})
