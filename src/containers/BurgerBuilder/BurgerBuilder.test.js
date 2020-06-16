import React from 'react'

// Enzyme
import { configure, shallow } from 'enzyme'

// Adapter for enzyme
import Adapter from 'enzyme-adapter-react-16'

// Components for testing
import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from 'components/Burger/BuildControls/BuildControls'

configure({ adapter: new Adapter() })

describe('[BurgerBuilder]', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <BurgerBuilder 
                onInitIngredients={()=>{}} 
                onRedirect={()=>{}}
                onInitIngredientPrice={()=>{}}
                onInitBasePrice={()=>{}}
            />
        )
    })

    it('should render [BuildControls] when receiving ingredients', () => {
        wrapper.setProps({ ings: { salad:0 } })
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})