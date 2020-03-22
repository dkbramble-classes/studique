import React from 'react';
import App from '../../pages/app'
import {render, fireEvent, cleanup, getByPlaceholderText, getByText, getElementById, waitForElement, waitForElementToBeRemoved} from '@testing-library/react';


afterEach(cleanup)

it('Checking for input typing', async () => {
  const { search } = render(<App/>);
  
  fireEvent.click(document.getElementById("signInNav").closest('button'))

  const inputEmail  = document.getElementById("inputEmailIn")   
  fireEvent.change(inputEmail, { target: { value: 'boi@mail.gvsu.edu' } })
  const inputPassword  = document.getElementById("inputPasswordIn")   
  fireEvent.change(inputPassword, { target: { value: 'boiboibobiboiboiboi' } })

  fireEvent.click(document.getElementById("signInSubmit").closest('input'))
  await waitForElementToBeRemoved(() => document.getElementById("signInNav").closest('button'));
  fireEvent.click(document.getElementById("profileNav").closest('input'))

  const inputTags = document.getElementById("profileNameInput")   
  expect(inputTags.value).toBe("BOIB")   
});
