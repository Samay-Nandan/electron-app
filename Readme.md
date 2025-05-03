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

# GitHub Auto Release (Snap + Tags)

## Install Snapcraft

```bash
sudo snap install snapcraft --classic
```

## Create Snapcraft Credentials

```bash
snapcraft export-login snapcraft-creds.json
```

## Add Credentials to GitHub

- In your GitHub repository:

  Navigate to: Settings > Secrets and variables > Actions > New repository secret

  Make sure token has only repo scope (no additional permissions needed)

Create the following two secrets:

1. SNAPCRAFT_STORE_CREDENTIALS: Contents of snapcraft-creds.json
2. GH_TOKEN: GitHub Personal Access Token
