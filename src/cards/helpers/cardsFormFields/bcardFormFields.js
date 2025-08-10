const bcardFormFields = [
    { name: 'title', label: 'Title *', type: 'text', section: 'basic', autoComplete: 'off', autoCapitalize: 'words' },
    { name: 'subtitle', label: 'Subtitle *', type: 'text', section: 'basic', autoComplete: 'off', autoCapitalize: 'words' },
    {
        name: 'description',
        label: 'Description *',
        type: 'text',
        section: 'basic',
        multiline: true,
        fullWidth: true,
        autoComplete: 'off',
        autoCapitalize: 'sentences'
    },

    { name: 'phone', label: 'Phone *', type: 'tel', section: 'contact', autoComplete: 'tel', inputMode: 'tel' },
    { name: 'email', label: 'Email *', type: 'email', section: 'contact', autoComplete: 'email', inputMode: 'email' },
    { name: 'web', label: 'Website', type: 'text', section: 'contact', autoComplete: 'url', inputMode: 'url' },

    { name: 'url', label: 'Image URL', type: 'text', section: 'image', autoComplete: 'url', inputMode: 'url' },
    { name: 'alt', label: 'Image Alt Text', type: 'text', section: 'image', autoComplete: 'off', autoCapitalize: 'words' },

    { name: 'country', label: 'Country *', type: 'text', section: 'address', autoComplete: 'country-name', autoCapitalize: 'words' },
    { name: 'city', label: 'City *', type: 'text', section: 'address', autoComplete: 'address-level2', autoCapitalize: 'words' },
    { name: 'street', label: 'Street *', type: 'text', section: 'address', autoComplete: 'street-address', autoCapitalize: 'words' },
    { name: 'houseNumber', label: 'House Number *', type: 'number', section: 'address', autoComplete: 'off', inputMode: 'numeric' },
    { name: 'state', label: 'State', type: 'text', section: 'address', autoComplete: 'address-level1', autoCapitalize: 'words' },
    { name: 'zip', label: 'ZIP Code', type: 'text', section: 'address', autoComplete: 'postal-code', inputMode: 'numeric' },
];

export default bcardFormFields;