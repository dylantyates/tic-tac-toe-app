import React from 'react';
import Game from './Game';
import { shallow, mount } from 'enzyme';

it ('renders without crashing', () => {
  shallow(<Game />);
});

it ('renders game status correctly', () => {
  const wrapper = mount(<Game />);
  const firstPlayer = wrapper.find('div.status').text();
  expect(firstPlayer).toEqual('Player One (X)');
});
