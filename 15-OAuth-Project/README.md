# Google OAuth Authentication with Passport.js

A Node.js and Express.js project demonstrating Google OAuth 2.0 authentication using Passport.js and the `passport-google-oauth20` strategy.

## Features

- Sign in with Google using OAuth 2.0
- Google authentication using Passport.js
- Express session-based authentication
- Protected routes using authentication middleware
- Access authenticated Google user profile information
- Display authenticated user's name and profile image
- Logout functionality
- Secure credential management using environment variables

## Technologies Used

- Node.js
- Express.js
- Passport.js
- passport-google-oauth20
- express-session
- dotenv
- Nodemon

## Environment Variables

Create a `.env` file in the project root:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
```

> **Security:** Never commit the `.env` file or expose sensitive credentials such as the Google Client Secret or session secret.

## Google OAuth Flow

```text
User
  ↓
Clicks "Login with Google"
  ↓
Express.js Application
  ↓
Passport.js
  ↓
Google OAuth 2.0
  ↓
Google Login / Consent
  ↓
Google redirects to Callback URL
  ↓
Passport Google Strategy
  ↓
Google User Profile
  ↓
User serialized into Express Session
  ↓
Authenticated User
  ↓
Protected Profile Page
```

### Flow Explanation

1. The user clicks **Login with Google**.
2. Express redirects the request to Google using Passport.js.
3. Google authenticates the user and asks for the required permissions.
4. After successful authentication, Google redirects the user to the configured callback URL.
5. Passport's Google strategy receives the authenticated Google profile.
6. Passport serializes the user information into the Express session.
7. On subsequent requests, Passport deserializes the user and makes the authenticated user available through `req.user`.
8. Authentication middleware checks whether the user is authenticated before allowing access to protected routes.
9. The user can access the profile page until the session ends or the user logs out.

## Google Profile Information

After successful authentication, Passport makes the Google profile available through:

```js
req.user
```

Common profile information can be accessed as:

```js
req.user.id
req.user.displayName
req.user.photos
```

For example:

```js
const name = req.user.displayName;
const profileImage = req.user.photos[0].value;
```

The profile can then be displayed in the protected route:

```js
app.get('/profile', authCheck, (req, res) => {
    res.send(`
        <h1>Welcome ${req.user.displayName}</h1>
        <img
            src="${req.user.photos[0].value}"
            alt="Profile"
            width="100"
            height="100"
        />
        <a href="/logout">Logout</a>
    `);
});
```

## Role of Express Session

Google OAuth authenticates the user, while `express-session` helps maintain the authenticated state between requests.

```text
Google Authentication
        ↓
Passport receives user profile
        ↓
Passport serializes user
        ↓
User information stored in session
        ↓
Browser receives session cookie
        ↓
Future request
        ↓
Session identifies user
        ↓
Passport deserializes user
        ↓
req.user becomes available
```

This allows protected routes to recognize the authenticated user without requiring Google authentication on every request.

## Protected Routes

Authentication middleware can prevent unauthenticated users from accessing protected pages.

Example:

```js
const authCheck = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }

    next();
};
```

Then apply it to the required route:

```js
app.get('/profile', authCheck, (req, res) => {
    // Authenticated user can access this route
});
```

## Profile Image Note

During development, the profile image URL returned through:

```js
req.user.photos[0].value
```

returned an HTTP `429 Too Many Requests` response from Google's image server when used dynamically in the profile page.

The same Google-hosted image could be displayed when the image URL was added directly to the code.

The OAuth authentication itself works correctly. The profile-image issue is being tracked separately for further investigation.

## Learning Objective

The purpose of this project is to understand:

- Google OAuth 2.0 authentication
- Passport.js authentication flow
- Google OAuth strategy configuration
- OAuth callback handling
- Session-based authentication
- Passport serialization and deserialization
- Protected routes
- Accessing authenticated user information through `req.user`
- Logout flow

## Current Status

| Feature | Status |
|---|---|
| Google OAuth Login | ✅ Working |
| OAuth Callback | ✅ Working |
| Express Session | ✅ Working |
| Passport Serialization / Deserialization | ✅ Working |
| Protected Profile Route | ✅ Working |
| Google Display Name | ✅ Working |
| Logout | ✅ Working |
| Google Profile Image | ⚠️ 429 issue under investigation |