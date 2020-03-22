import React from 'react';
import QuestionFormPage from '../../pages/questionFormPage'
import {render, fireEvent, cleanup, getByPlaceholderText, getByText, getElementById} from '@testing-library/react';
import { MemoryRouter} from "react-router-dom";


afterEach(cleanup)

it('Checking for input typing', () => {
  const { search } = render(<MemoryRouter><QuestionFormPage/></MemoryRouter>);

  const inputTitle  = document.getElementById("questionTitle")   
  expect(inputTitle.value).toBe("")   
  fireEvent.change(inputTitle, { target: { value: 'Hey yo where yall get some snacks?' } })
  expect(inputTitle.value).toBe('Hey yo where yall get some snacks?')

  const inputBody  = document.getElementById("questionBody")   
  expect(inputBody.value).toBe("")   
  fireEvent.change(inputBody, { target: { value: 'Yo guys I really need some snacks. Like Now. I need them so so so bad. I could eat for days. Does not matter what the snacks are any will do. Thanks!' } })
  expect(inputBody.value).toBe('Yo guys I really need some snacks. Like Now. I need them so so so bad. I could eat for days. Does not matter what the snacks are any will do. Thanks!')

  const inputTags  = document.getElementById("questionTags")   
  expect(inputTags.value).toBe("")   
  fireEvent.change(inputTags, { target: { value: 'Snacks, Urgent' } })
  expect(inputTags.value).toBe('Snacks, Urgent' )

  // fireEvent.click(document.getElementById("qFormSubmit").closest('button'))
  // expect(createQuestion).toHaveBeenCalledTimes(1)
});
