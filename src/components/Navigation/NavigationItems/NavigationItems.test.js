import React from 'react'

// Enzyme
import { configure, shallow } from 'enzyme'

// Adapter for enzyme
import Adapter from 'enzyme-adapter-react-16'

// Components for testing
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
import { FiLogOut } from 'react-icons/fi'

// Configuring adapter for enzyme
configure({ adapter: new Adapter() })

describe('[NavigationItems]', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render two [NavigationItem] components if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render three [NavigationItem] components if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should render the signout [NavigationItem] component if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.contains(
            <NavigationItem
                link={'/signout'}
                exact
            ><p>SignOut</p> <FiLogOut /></NavigationItem>
        )).toBeTruthy()
    })
})