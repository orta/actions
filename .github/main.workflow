name: Build Website

on:
  issue

jobs:
  build:
    runs-on: ubuntu-latest

    steps:

    - name: Hello world action
      run: "env"
      with: # Set the secret as an input
        super_secret: ${{ secrets.SuperSecret }}
      env: # Or as an environment variable
        super_secret: ${{ secrets.SuperSecret }}
