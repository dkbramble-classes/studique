import React from 'react';
import SignUp from '../../components/signUp'
import {render, fireEvent, cleanup, getByPlaceholderText} from '@testing-library/react';

afterEach(cleanup)

it('Checking for Display input typing', () => {
    const { search } = render(<SignUp/>);

    const container = document.body;
    expect(getByPlaceholderText(container, 'Full Name').textContent).toBe("")   

    const setupDisplay = () => {
      const input = document.getElementById("inputDisplayUp");
      return {
        input,
        ...search,
      }
    }
    const { input } = setupDisplay()  
    fireEvent.change(input, { target: { value: 'Dane' } })
    expect(input.value).toBe('Dane')
 });
 it('Checking for Email input typing', () => {
    const { search } = render(<SignUp/>);

    const container = document.body;
    expect(getByPlaceholderText(container, 'Email').textContent).toBe("")   
    const setupEmail = () => {
        const input = document.getElementById("inputEmailUp");
        return {
          input,
          ...search,
        }
      }
    const { input } = setupEmail()        
    fireEvent.change(input, { target: { value: 'dane@mail.gvsu.edu' } })
    expect(input.value).toBe('dane@mail.gvsu.edu')
 });

 it('Checking for Password input typing', () => {
    const { search } = render(<SignUp/>);

    const container = document.body;
    expect(getByPlaceholderText(container, 'Password').textContent).toBe("")   
    const setupPassword = () => {
        const input = document.getElementById("inputPasswordUp");
        return {
          input,
          ...search,
        }
    }
    const { input } = setupPassword()    
    fireEvent.change(input, { target: { value: 'f@kePa$$w0rd' } })
    expect(input.value).toBe('f@kePa$$w0rd')
 });
