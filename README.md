# NextAuth.js Account Linking Sample Project

This project demonstrates how to implement account linking using NextAuth.js, allowing users to
connect multiple OAuth accounts (or email/credentials) to a single user profile.

## Key Concepts

*   **Database Requirement:** NextAuth.js requires a database adapter configuration to persist user
    and account data. This allows it to track which accounts belong to which user. Without a database,
    each sign-in creates a new, separate user. This sample uses MongoDB using a modified version of
    the default adapter shown in the NextAuth.js documentation.
*   **Linking Process:** Linking occurs automatically when a user, who is already signed in,
    initiates and completes a sign-in flow with a *different* account/provider. No extra backend
    code is typically needed beyond the standard NextAuth.js setup.
*   **Multiple Providers/Accounts:** A single user can link accounts from various providers (e.g.,
    Google, GitHub) and even multiple accounts from the *same* provider.
*   **Sign-In Limitation (Security):** While multiple accounts can be *linked*, only linked accounts
    whose **email address matches the email address associated to the user** can be used for
    subsequent *sign-ins* to access that user profile. Unless changed, this email address will be the
    same as the address of the account used to create the user profile. Attempting to sign in using
    a linked account with a non-matching email will result in an error prompting the user to use an
    account with the correct email.

## Getting Started

The project is currently deployed at https://account-linking-sample.vercel.app. However, if you want
to run the project yourself, you can follow the instructions below.

### Prerequisites

*   Node.js 22.14 or higher
    *   Earlier versions may work, but this is the one that the application has been tested to work
        on.
*   npm
*   A MongoDB database
*   A Google OAuth client
*   A GitHub OAuth application
*   A GitLab OAuth application

### Setup

*Note that you may encounter issues when trying to login from a development server due to CSRF
protection.*

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/PerseverantDT/NextAuth-Account-Linking-Sample.git
    cd NextAuth-Account-Linking-Sample
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    
    This project uses NextAuth.js's specified environment variable names in order for it to
    automatically handle setting the client IDs and secrets in the providers. The following
    environment variables must be set up for the project to work.

    - `MONGODB_URI`: The connection string to the MongoDB database.
    - `AUTH_SECRET`: The secret used to encrypt the JWT session token.
    - `AUTH_GOOGLE_ID`: The client ID of your Google OAuth client.
    - `AUTH_GOOGLE_SECRET`: The client secret of your Google OAuth client.
    - `AUTH_GITHUB_ID`: The client ID of your GitHub OAuth application.
    - `AUTH_GITHUB_SECRET`: The client secret of your GitHub OAuth application.
    - `AUTH_GITLAB_ID`: The client ID of your GitLab OAuth application.
    - `AUTH_GITLAB_SECRET`: The client secret of your GitLab OAuth application.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Test Account Linking

1.  Click "Sign in" and choose an initial provider (e.g., Google). Complete the sign-in flow.
2.  You should now be signed in. Click the "Link Account" button
3.  Choose a *different* provider or account (e.g., GitHub). Complete its sign-in flow.
4.  NextAuth.js should automatically link this second account to your existing user profile. The
    profile page will show you which accounts are linked to your user profile, as well as the
    provider used by those accounts. Due to how NextAuth.js provides account details, the names of
    the listed accounts as well as their email addresses are not shown.
5.  Sign out.
6.  Try signing back in using the *second* account (GitHub in this example).
    * If the email associated with the GitHub account **matches** the email of the initial Google
     account, sign-in should succeed, and you should access the *same* user profile.
    * If the emails **do not match**, you should see an error explaining that you need to sign in
     with the account you used to create the user profile. NextAuth.js doesn't actually store a
     "primary account", but this message is used so that the user will try an account that, under
     normal circumstances, will always work.
