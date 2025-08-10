const normalaizeUser = (userDetails) => {
    const userDetailsForServere = {

        "name": {
            "first": userDetails.first,
            "middle": userDetails.middle,
            "last": userDetails.last
        },

        "phone": userDetails.phone,
        "email": userDetails.email,
        "password": userDetails.password,
        "image": {
            "url": userDetails.url,
            "alt": userDetails.alt
        },

        "address": {
            "state": userDetails.state,
            "country": userDetails.country,
            "city": userDetails.city,
            "street": userDetails.street,
            "houseNumber": userDetails.houseNumber,
            "zip": userDetails.zip
        },

        "isBusiness": userDetails.isBusiness || false
    };

    return userDetailsForServere

}

export default normalaizeUser;