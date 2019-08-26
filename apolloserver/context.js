const context = ({ req }) => {

    // Get the user token from the headers
    const token = (req.headers.authorization || '').split(' ')[1]

    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        throw new AuthenticationError(
            'Authentication token is invalid, please log in'
        )
    }
}