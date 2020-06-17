import React, { Fragment } from 'react';

export default function mountConfig(inputHandler) {
    function generateFormStructure(
        configProps,
        value,
        elementType = 'input',
        children = null,
        validation = null,
        touched = false,
    ) {
        return {
            type: elementType,
            value,
            touched,
            config: { ...configProps },
            children,
            validation
        }
    }

    return {
        name: generateFormStructure({
            required: true,
            name: 'name',
            label: 'Your name',
            onChange: e => inputHandler(e, 'name'),
            placeholder: 'ex.: Gabriel Melo'
        }, '',undefined, undefined, {
            valid: false,
            required: true,
            minLength: 10,
            maxLength: 30
        }),
        email: generateFormStructure({
            required: true,
            name: 'email',
            type: 'email',
            label: 'Your email',
            onChange: e => inputHandler(e, 'email'),
            placeholder: 'ex.: example@placeholder.com'
        }, '',undefined, undefined, {
            valid: false,
            required: true,
            hasCharacters: ['@', '.']
        }),

        street: generateFormStructure({
            required: true,
            name: 'street',
            label: 'Your street',
            onChange: e => inputHandler(e, 'street'),
            placeholder: 'ex.: 7th Street, Main Avenue'
        }, '',undefined, undefined, {
            valid: false,
            required: true,
            minLength: 5,
            maxLength: 20
        }),
        zipCode: generateFormStructure({
            required: true,
            name: 'zipCode',
            label: 'Your zip code',
            onChange: e => inputHandler(e, 'zipCode'),
            placeholder: 'ex.: 12345678'
        }, '',undefined, undefined, {
            valid: false,
            required: true,
            minLength: 8,
            maxLength: 8
        }),
        country: generateFormStructure({
            required: true,
            name: 'country',
            label: 'Your country',
            onChange: e => inputHandler(e, 'country'),
            placeholder: 'ex.: Brazil'
        }, '', undefined, undefined, {
            valid: false,
            required: true,
            minLength: 5
        }),
        deliveryMethod: generateFormStructure({
            name: 'deliveryMethod',
            label: 'Choose a delivery method',
            onChange: e => inputHandler(e, 'deliveryMethod'),
            defaultValue: 'normal'
        }, 'normal','select', (
            <Fragment>
                <option value='normal'>Normal</option>
                <option value='express'>Express (+ 10% fee)</option>
            </Fragment>
        ), {valid: true})
    }
}