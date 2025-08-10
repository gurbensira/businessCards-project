const normalizeBCard = (cardDetails) => {
    return {
        "title": cardDetails.title,
        "subtitle": cardDetails.subtitle,
        "description": cardDetails.description,
        "phone": cardDetails.phone,
        "email": cardDetails.email,
        "web": cardDetails.web,
        "image": {
            "url": cardDetails.url,
            "alt": cardDetails.alt
        },
        "address": {
            "state": cardDetails.state,
            "country": cardDetails.country,
            "city": cardDetails.city,
            "street": cardDetails.street,
            "houseNumber": Number(cardDetails.houseNumber),
            "zip": Number(cardDetails.zip) || 0
        }
    };
};

export default normalizeBCard;