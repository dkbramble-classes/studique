import React from 'react';
import NavSearchText from '../../components/navsearch_text'
import {render, fireEvent, cleanup, getByPlaceholderText} from '@testing-library/react';
import { MemoryRouter} from "react-router-dom";

afterEach(cleanup)

it('Checking for button disabled', () => {
    const { search } = render(<MemoryRouter initialEntries={["/results/search=test"]}><NavSearchText/></MemoryRouter>);

    const container = document.body;
    expect(getByPlaceholderText(container, 'SEARCH QUESTIONS').textContent).toBe("")   
    expect(document.getElementById("navSubmit").closest('button').disabled).toEqual(true);

    const setup = () => {
      const input = document.getElementById("inputMini");
      return {
        input,
        ...search,
      }
    }
    const { input } = setup()    
    fireEvent.change(input, { target: { value: 'Do' } })
    expect(input.value).toBe('Do')
    expect(document.getElementById("navSubmit").closest('button').disabled).toEqual(false);
    fireEvent.change(input, { target: { value: '' } })
    expect(document.getElementById("navSubmit").closest('button').disabled).toEqual(true);
 })

 it('calls "handleSearch" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const handleSearch = jest.fn();
  const { search } = render(<MemoryRouter initialEntries={["/"]}>
  <NavSearchText handleSearch={handleSearch}/> 
  </MemoryRouter>);

  const container = document.body; 
  const setup = () => {
    const input = document.getElementById("inputMini");
    return {
      input,
      ...search,
    }
  }
  const { input } = setup()    
  fireEvent.change(input, { target: { value: 'Do' } })
  fireEvent.click(document.getElementById("navSubmit").closest('button'))
  expect(handleSearch).toHaveBeenCalled();
});