import React from 'react';
import Nav from '../../components/nav'
import {render, cleanup} from '@testing-library/react';
import { MemoryRouter} from "react-router-dom";

afterEach(cleanup)

it('Checking initial log in state', () => {
    const { search } = render(<MemoryRouter><Nav isAuthed={false}/></MemoryRouter>);
    expect(document.getElementById("signInNav").closest('button')).toBeInTheDocument()
    expect(document.getElementById("signUpNav").closest('button')).toBeInTheDocument()
    expect(document.getElementById("profileNav")).toBeNull()
    expect(document.getElementById("logOutNav")).toBeNull()
 });

 it('Checking logged in state', () => {
  const { search } = render(<MemoryRouter><Nav isAuthed={true}/></MemoryRouter>);
  expect(document.getElementById("profileNav").closest('input')).toBeInTheDocument()
  expect(document.getElementById("logOutNav").closest('input')).toBeInTheDocument()
  expect(document.getElementById("signInNav")).toBeNull()
  expect(document.getElementById("signUpNav")).toBeNull()
});