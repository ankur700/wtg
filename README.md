# HTML Template to WordPress Theme Generator

Generate classic WordPress themes from your HTML templates.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project provides a tool to convert HTML templates into fully functional WordPress themes. It simplifies the process of theme development by automating the conversion of static HTML templates into dynamic WordPress themes.

## Features

- **Automated Conversion**: Easily convert HTML templates to WordPress themes.
- **Customizable**: Allows customization of the generated themes.
- **User-Friendly**: Simple interface for ease of use.
- **Supports Modern Technologies**: Built with modern web technologies like Svelte and TypeScript.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ankur700/wtg.git
   ```
2. Navigate to the project directory:
   ```sh
   cd wtg
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Build the project:
   ```sh
   npm run build
   ```

## Usage

To get started quickly, follow the steps below to generate a classic WordPress theme. Note that you will still need to convert your navigation menu and any other customizations. For more information, check the WordPress documentation.

1. **Create your HTML template**: Structure it like this:
   ```
   template folder
   ├── index.html
   ├── main.css
   ├── main.js
   └── assets folder
       ├── additional css files
       └── additional js files
   ```

2. **Prerequisite**: 
   - Remove any loading screens from the `index.html` file.
   - Optionally, remove the links to CSS and JS files from the `index.html` file.
   - Stylesheets and scripts loaded from CDNs should be downloaded in advance.

3. **Upload**:
   - Head to the generate theme page.
   - Upload your `index.html` file, `main.css` file, `main.js` file, and other CSS and JS files (custom JS libraries and custom CSS libraries files) according to the input label.

4. **Convert**:
   - Generate your WordPress theme by clicking the generate button.
   - Download the theme zip file.

5. **Install**:
   - Install your WordPress theme by opening the WordPress admin panel.
   - Click Appearance -> Themes and click the Upload button.
   - Select the theme zip file and click Install.

## Demo

Check out the demo of the HTML Template to WordPress Theme Generator [here](https://ankur700.github.io/wtg/).

## Contributing

We welcome contributions to improve the HTML Template to WordPress Theme Generator. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
