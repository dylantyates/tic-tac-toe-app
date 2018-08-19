import React from 'react';
import Board from './Board';
import { shallow, mount } from 'enzyme';

it ('renders without crashing', () => {
  // Empty squares array
  let squares = Array(9).fill(null);
  shallow(<Board squares={squares} />);
});

// Test square click and expect initial array position of 0
it ('calls onClick event on click', () => {
  let squares = Array(9).fill(null);
  const onClick = jest.fn();
  // Mount board to wrapper
  let wrapper = mount(<Board squares={squares} onClick={onClick} />);
  // Select button with class square and simulate click
  wrapper.find('button.square').first().simulate('click');
  // Expected value 0 on initial click
  expect(onClick).toBeCalledWith(0);
});

