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

# GitHub Auto Release (Tags)

## Add Credentials to GitHub

- In your GitHub repository:

  Navigate to: Settings > Secrets and variables > Actions > New repository secret

  Make sure token has only repo scope (no additional permissions needed)

Create the following secret:

- GH_TOKEN: GitHub Personal Access Token

## Git Tagging and Pushing to GitHub

```bash
git tag v1.0.0 && git push --tags
```

### IMPORTANT: Update package.json

- Before tagging, make sure to update the version field in your frontend package.json
  If the version isn’t updated, the Electron auto-updater will not work at all.
