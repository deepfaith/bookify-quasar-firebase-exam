# Coding Challenge

This project is a Backend app built in Quasar, and Vue3

## Getting started
This project was tested with node v16.15.1

To get started:
1. Fork the repo
2. Install all dependencies
    ```bash
    npm install
   yarn
    ```
3. Create Firebase project - see next section

    ```
## Creating Firebase project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click _Add Project_ Give it a name and click _Continue_.
3. Disable Google Analytics click _Continue_.
4. After the project was created click _Continue_. It will take you to the project overview. Now we need to create an app.
5. Click the _web_ icon, give your app a name and click _Register App_.
6. You’ll be taken to _Step 2 - Add Firebase SDK_.
7. Copy `firebaseConfig` json that looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "xxxxxxxxxxx",
     authDomain: "xxxxxxxxxx",
     projectId: "xxxxxxxxxx",
     storageBucket: "xxxxxxxx",
     messagingSenderId: "xxxxxxxxx",
     appId: "xxxxxxx"
   };
   ```
## Creating Firebase Authentication
1. Copy the _firebaseConfig_ parameters to _src/firebase/config.js_ 
2. Back in Firebase Console, click _Continue to Console_.
3. On the left panel click _Authentication_, then click _Sign-in method_.
4. Enable _Email/Password_. Do not enable _Email link_.
5. Before enabling Google, let's verify our domain so Google can send emails on our behalf. Click the _Templates_ tab.
6. On one of the email templates, click the pencil icon next to the _From_ address.
7. Click _Customise domain_ link under the domain name.
8. Follow the instructions on configuring your DNS and complete the verification.
9. Once done, we can go back to adding Google as login method. Click _Sign-in method_ tab again.
10. Enable _Google_. You'll have to provide your app's support-email. Also make sure that your _Project public facing name_ appears as you want your customers to see it. It will appear on Google's authentication dialog.

## Creating Firebase Cloud
1. Back in Firebase Console, click _Continue to Console_.
2. On the left panel click _Firestore Database_, then click _Sign-in method_.
3. Click _Create Database_. Choose _Start in test mode_, then Click _Next_.
4. Choose the closest location in the dropdown menu, then Click _Enable_.


### Run the App

Start the app
```bash
quasar dev

## Contribution

Contributions are welcome. Just create a PR and explain what you've done :)
