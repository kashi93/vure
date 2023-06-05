# Vure

<p align="center">
    <a href="https://packagist.org/packages/kashi93/vure">
        <img src="https://img.shields.io/packagist/v/kashi93/vure" alt="Latest Stable Version">
    </a>
    <a href="https://packagist.org/packages/kashi93/vure">
        <img src="https://img.shields.io/packagist/l/kashi93/vure" alt="License">
    </a>
</p>

## Introduction

Vure provides a simple starting point for building a SPA (single-page application) using Vue or React with the Laravel framework. The code structure remains unchanged, and Vure can be styled using either Bootstrap or Tailwind. Additionally, Vure includes authentication controllers and views that can be easily customized to fit the needs of your application.


## Installation

Create a new Laravel application

```
composer create-project laravel/laravel example-app
```

Install Vure using Composer

```
composer require kashi93/vure
```

Once Vure is installed, you may scaffold your application using one of the Vure "stacks" discussed in the documentation below.

## Vue With Bootstrap

```
php artisan vure:install vue-bs

php artisan migrate
npm install
npm run dev / npm run build
```

## Vue With Tailwind

```
php artisan vure:install vue-tw

php artisan migrate
npm install
npm run dev / npm run build
```

## React With Bootstrap (Coming Soon)

```
php artisan vure:install react-bs

php artisan migrate
npm install
npm run dev / npm run build
```

## React With Tailwind

```
php artisan vure:install react-tw

php artisan migrate
npm install
npm run dev / npm run build
```

## License

Vure is open-sourced software licensed under the [MIT license](LICENSE.md).