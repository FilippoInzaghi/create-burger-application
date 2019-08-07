import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder /> tests', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder ings={{salad: 0}} onInitIngredients = {() => {}}/>);
    });
    it('should render Modal', () => {
        expect(wrapper.find(Modal)).toHaveLength(1)
    });
    it('should render <BuildControls /> when receiving ingredients', () => {
        // wrapper.setProps({ ings={salad: 0} });
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    });
})