<p align="center">
    <div align="center">
        <img alt="icon" height="128" src="./assets/icon.png">
        <h1>Cosmic-Pics</h1>
    </div>
</p>

<p align="center">
    <a aria-label="Expo Go" href="https://expo.dev/go" target="_blank">
        <img alt="Expo Go" src="https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000" />
    </a>
    <a aria-label="License" href="./LICENSE" target="_blank">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-success.svg?style=flat-square&color=000" target="_blank" />
    </a>
</p>

## Introduction

"Cosmic Pics" is an innovative app that utilizes NASA's APOD (Astronomy Picture of the Day) API to display images in a smart and engaging way. With a user-friendly interface, you can easily browse APOD images using a calendar, or get lost in an infinite scrolling feed, similar to TikTok.

In addition, our app allows you to mark your favorite images as favorites, so you can easily access them at any time. "Cosmic Pics" is the perfect tool for anyone interested in astronomy, or for those who simply want to discover the beauty of our universe.

## Installation

### 1. From Google Play Store

You will soon be able to download the app from the Google Play Store.

### 2. Manual Installation

-   Clone the repository

```bash
git clone https://github.com/wiizzl/cosmic-pics
```

-   Install dependancies

```bash
pnpm install
```

-   Create local env file, copy content of [.env.example](.env.example) and paste it in your new file. Then, complete it with your [API key](https://api.nasa.gov/). If you want to build the app, you will need to follow the [documentation](https://docs.expo.dev/build/setup/) and to enter again your API key in the [build file](eas.json).

```bash
touch .env.local
```

-   Start the app

```bash
pnpm run start
```

-   Install [Expo Go](https://expo.dev/go) and scan the QR Code showed in your terminal

## Acknowledgments

I was inspired by a [design](<https://www.behance.net/gallery/112187349/Astronomy-picture-of-the-day-(APOD)-Mobile-App>) I found on Behance made by [Angelina Grebenkina](https://www.behance.net/angelingrebenk). Thank you very much for this good work.

## License

This code is made available under the [GNU GPLv3 License](https://choosealicense.com/licenses/gpl-3.0/).
