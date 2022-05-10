# Messaging App

[![LCubeStudios](https://badgen.now.sh/badge/Developed%20by/LCube%20Studios/?color=FFCB05)](https://lcubestudios.io)

![Banner](/demo_assets/banner.png?raw=true "Banner")

Messaging App is a microframework for messaging and managing private communications between users. It is an open source project that is built with Github and Docker, making it accessible and easy to install on private servers. The application is self hosted, ensuring that in-house data is stored in a private database.

It is a white-label product that is flexible to color and logo customizations, offering organizations the ability to design personalized aesthetics.

## Important Links

🌎 [Demo](https://demo.lcubestudios.io/messagingapp-frontend)

📝 [Case Study](https://lcubestudios.io/work/messaging-app)

📒 [Documentation](/README.md)

## Installation Options

### 🐳 Option 1 : Containerized Image
This option allows installation of frontend and backend environments as a containerized docker image with env configurations.

Links:
[Docker Repository](https://github.com/lcubestudios/messagingapp-docker)

### ⚙️ Option 2 : Download from source code
This option allows you to download and install frontend and backend code independently

Links:
[Frontend Repository](https://github.com/lcubestudios/messagingapp-frontend)

️[Backend Repository](https://github.com/lcubestudios/messagingapp-api)

# Front End Documentation

## Technologies Used

- Package management: [Yarn](https://yarnpkg.com/)
- UI framework: [VueJS](https://vuejs.org/)
- Styling: [Tailwlind CSS](https://tailwindcss.com/)
- Formatting: [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/)

## Installation

Clone repository
```sh
git clone https://github.com/lcubestudios/messagingapp-frontend.git
```

Change to project directory
```sh
cd messagingapp-frontend
```

Checkout branch
```sh
git fetch && git checkout { branch name }
```

Install dependencies
```sh
yarn install
```

## Environment Variables
> Copy  ```env.example``` to ```.env``` and adjust the values where necessary.

```env
## CONFIG
VUE_APP_BASE_URL='/path/to/project/'
VUE_APP_API_URL='htts://api.url'

## BRANDING
VUE_APP_SITE_TITLE='Messaging App | Powered by LCube Studios'
VUE_APP_LOGO_URL='/path/to/logo/'
```

## Styling

#### Favicon
To update the favicon, replace ```favicon.png``` inside the ```public/img/``` directory

#### Colors
Theme colors can be modified in the ```_config.css``` file inside the ```src/assets/css/``` directory

## Usage

Run Local Dev Environment 
```sh
yarn serve
```

Run Production Build 
```sh
yarn build
```

## 📣 Connect with LCube Studios
- 🌎 [Website](https://Lcubestudios.io)
- ✉️ [Contact Us](mailto:Contact@lcubestudios.io)
- 📅 [Let's Meet](https://calendly.com/lcubestudios/30min)
#### Follow Us
- [LinkedIn](https://www.linkedin.com/company/lcubestudios/)
- [Instagram](https://www.instagram.com/lcubestudios)
- [Facebook](https://www.facebook.com/lcubestudiosnyc/)
- [Twitter](https://www.twitter.com/lcubestudios/)
- [Discord](https://discord.com/invite/6Ud9x23zaK)
- [Github](https://github.com/lcubestudios)

## 💡 Let's make your FrameWork