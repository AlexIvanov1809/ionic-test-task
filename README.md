# Ionic and Capacitor

## Приложение для WEB

- Клонируете репозиторий
- С помощью команды `ionic build` создает production версию в папку `dist`
- Загружаете файлы на хостинг

## Сборка debug-APK под Android

- С помощью команды `npx cap add android` создает android версию в папку `android`
- С помощью команды `npx cap open android` открывает проект в Android Studio
- В Android Studio выбираете Build --> Build Bundle(s) / APK(s) --> Build APK(s)
- После файле будет лежать в проекте `android\app\build\outputs\apk\debug`
