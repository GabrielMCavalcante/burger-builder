export default function mountConfig(context) {
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
        email: generateFormStructure({
            required: true,
            name: 'email',
            type: 'email',
            label: 'Your email',
            onChange: e => context.inputChangedHandler(e, 'email'),
            placeholder: 'ex.: example@placeholder.com'
        }, '', undefined, undefined, {
            valid: false,
            required: true,
            hasCharacters: ['@', '.']
        }),
        password: generateFormStructure({
            required: true,
            name: 'password',
            type: 'password',
            label: 'Your password',
            onChange: e => context.inputChangedHandler(e, 'password'),
            placeholder: 'ex.: 123456789'
        }, '', undefined, undefined, {
            valid: false,
            required: true,
            minLength: 6
        }),
    }
}