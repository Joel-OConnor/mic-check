import React from 'react';
import { shallow } from 'enzyme';
import { SignUp, mapStateToProps, mapDispatchToProps } from '../';
import * as mockData from '../../../mockData';
import * as actions from '../../../actions';

describe('SignUp tests', () => {
  let wrapper;
  let mockRunFunction;
  const { mockUser, mockUsers } = mockData;
  const { setActiveUser, addUser } = actions;
  beforeEach(() => {
    mockRunFunction = jest.fn();
    wrapper = shallow( 
      <SignUp 
        users={mockUsers}
        activeUser={mockUser}
        addUser={mockRunFunction}
        setActiveUser={mockRunFunction}
      /> 
    );
  });

  it('renders the SignUp with the correct props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('MapStateToProps', () => {
    it('should have a users data object in props', () => {
      const mockState = {users: mockUser};
      const expected = {users: mockUser};
      const props = mapStateToProps(mockState);
      expect(props).toEqual(expected);
    });

    it('should have a activeUser data object in props', () => {
      const mockState = {activeUser: mockUser};
      const expected = {activeUser: mockUser};
      const props = mapStateToProps(mockState);
      expect(props).toEqual(expected);
    });
  });

  describe('MapDispatchToProps', () => {
    let mockDispatch;
    beforeEach(() => {
      mockDispatch = jest.fn();
    });

    it('should dispatch addUser when called', () => {
      const mockAction = addUser(mockUser);
      const props = mapDispatchToProps(mockDispatch);
      props.addUser(mockUser);
      expect(mockDispatch).toBeCalledWith(mockAction);
    });

    it('should dispatch setActiveUser when called', () => {
      const mockAction = setActiveUser(mockUser);
      const props = mapDispatchToProps(mockDispatch);
      props.setActiveUser(mockUser);
      expect(mockDispatch).toBeCalledWith(mockAction);
    });
  });
});
