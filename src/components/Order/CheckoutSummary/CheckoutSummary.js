import React from 'react'

// Components
import Burger from 'components/Burger/Burger'

// UI components
import Button from 'components/UI/Button/Button'

// CSS styles
import styles from './CheckoutSummary.css'

function CheckoutSummary(props) {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div className={styles.Burger}> <Burger /> </div>
            <Button 
                type="Danger" 
                click={()=>props.canceled()}
            >Cancel</Button>
            <Button 
                type="Success" 
                click={()=>props.continued()}
            >Continue</Button>
        </div>
    )
}

export default CheckoutSummary