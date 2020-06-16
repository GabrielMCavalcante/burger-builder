import { STATUS_TYPES } from 'store/actions/actionTypes'

export function updateObject(obj, updates) {
    return {
        ...obj,
        ...updates
    }
}

export const formValidation = {
    checkValidity(value, rules) {
        if (rules) {
            let valid = true
    
            if (rules.required) valid = value.trim() !== ''
    
            if (rules.minLength && valid) valid = value.length >= rules.minLength
    
            if (rules.maxLength && valid) valid = value.length <= rules.maxLength
    
            if (rules.hasCharacters && valid) {
                rules.hasCharacters.forEach(char => {
                    if (valid)
                        valid = value.includes(char)
                })
            }
    
            return valid
        }
        return true
    },
    checkFormValidity(updatedOrderForm) {
        let formValid = true
        Object.keys(updatedOrderForm).forEach(key => {
            if (formValid)
                formValid = updatedOrderForm[key].validation.valid
        })
        return formValid
    }
}

export function setError(error) {
    return { type: STATUS_TYPES.ERROR, error}
}