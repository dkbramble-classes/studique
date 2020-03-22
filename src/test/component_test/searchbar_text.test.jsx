import React from 'react';
import SearchBarText from '../../components/searchbar_text'
import {render, fireEvent, cleanup, getByPlaceholderText, getByText} from '@testing-library/react';
import { MemoryRouter} from "react-router-dom";

afterEach(cleanup)

it('Checking for button disabled', () => {
    const { search } = render(<MemoryRouter initialEntries={["/"]}><SearchBarText/></MemoryRouter>);

    const container = document.body;
    expect(getByPlaceholderText(container, 'ASK A QUESTION').textContent).toBe("")   
    expect(getByText(container, /Submit/i).closest('input').disabled).toEqual(true);

    const setup = () => {
      const input = document.getElementById("inputText");
      return {
        input,
        ...search,
      }
    }
    const { input } = setup()    
    fireEvent.change(input, { target: { value: 'Do' } })
    expect(input.value).toBe('Do')
    expect(getByText(container, /Submit/i).closest('input').disabled).toEqual(false);
    fireEvent.change(input, { target: { value: '' } })
    expect(getByText(container, /Submit/i).closest('input').disabled).toEqual(true);
 })

it('calls "handleSearch" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const handleSearch = jest.fn();
  const { search } = render(<MemoryRouter initialEntries={["/"]}>
  <SearchBarText handleSearch={handleSearch}/> 
  </MemoryRouter>);

  const container = document.body; 
  const setup = () => {
    const input = document.getElementById("inputText");
    return {
      input,
      ...search,
    }
  }
  const { input } = setup()    
  fireEvent.change(input, { target: { value: 'Do' } })
  fireEvent.click(getByText(container, /Submit/i).closest('input'))
  expect(handleSearch).toHaveBeenCalled();
});
