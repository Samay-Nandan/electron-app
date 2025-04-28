# Linux Production

## Install the Application

```bash
sudo dpkg -i build/linux/best-electron-app-1.0.0_amd64.deb
```

## Remove the Application

```bash
sudo dpkg --purge best-electron-app
```

## Testing (One-liner Command)

```bash
sudo dpkg --purge best-electron-app && yarn clean:build && yarn build:linux && sudo dpkg -i build/linux/best-electron-app-1.0.0_amd64.deb && best-electron-app && sudo dpkg --purge best-electron-app
```
