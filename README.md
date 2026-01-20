# Microfrontend Architecture with React

A complete microfrontend architecture implementation using React and Webpack 5 Module Federation. This project demonstrates how to build and orchestrate multiple independent React applications that can be composed together.

## Architecture Overview

This project consists of:

1. **Shell Application** (Port 3000) - The host/container application that orchestrates all microfrontends
2. **Products Microfrontend** (Port 3001) - A standalone application for product management
3. **Cart Microfrontend** (Port 3002) - A standalone application for shopping cart functionality

## Technology Stack

- **React 18** - UI library
- **Webpack 5** - Module bundler with Module Federation
- **React Router** - Client-side routing
- **Babel** - JavaScript compiler

## Project Structure

```
microfrontends/
├── shell/              # Host/Container application
│   ├── src/
│   │   ├── App.jsx     # Main shell component with routing
│   │   └── index.jsx   # Entry point
│   ├── webpack.config.js
│   └── package.json
├── products/           # Products microfrontend
│   ├── src/
│   │   ├── Products.jsx
│   │   └── index.jsx
│   ├── webpack.config.js
│   └── package.json
├── cart/               # Cart microfrontend
│   ├── src/
│   │   ├── Cart.jsx
│   │   └── index.jsx
│   ├── webpack.config.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies for all applications:

```bash
npm run install:all
```

Or install manually:

```bash
# Install root dependencies
npm install

# Install shell dependencies
cd shell && npm install && cd ..

# Install products dependencies
cd products && npm install && cd ..

# Install cart dependencies
cd cart && npm install && cd ..
```

### Running the Applications

You need to run all three applications simultaneously. Open three separate terminal windows:

**Terminal 1 - Shell Application:**
```bash
npm run start:shell
# or
cd shell && npm start
```

**Terminal 2 - Products Microfrontend:**
```bash
npm run start:products
# or
cd products && npm start
```

**Terminal 3 - Cart Microfrontend:**
```bash
npm run start:cart
# or
cd cart && npm start
```

Once all applications are running:
- Shell: http://localhost:3000
- Products: http://localhost:3001
- Cart: http://localhost:3002

Visit http://localhost:3000 to see the integrated microfrontend application.

## How Module Federation Works

### Shell Application (Host)

The shell application uses Module Federation to consume remote modules:

```javascript
remotes: {
  products: "products@http://localhost:3001/remoteEntry.js",
  cart: "cart@http://localhost:3002/remoteEntry.js",
}
```

### Microfrontends (Remotes)

Each microfrontend exposes its components:

**Products:**
```javascript
exposes: {
  "./Products": "./src/Products",
}
```

**Cart:**
```javascript
exposes: {
  "./Cart": "./src/Cart",
}
```

### Shared Dependencies

React and React DOM are shared as singletons to ensure only one instance is loaded:

```javascript
shared: {
  react: {
    singleton: true,
    requiredVersion: "^18.2.0",
  },
  "react-dom": {
    singleton: true,
    requiredVersion: "^18.2.0",
  },
}
```

## Features

- ✅ Independent deployment of microfrontends
- ✅ Shared dependencies (React, React DOM)
- ✅ Lazy loading of remote modules
- ✅ Client-side routing with React Router
- ✅ Modern UI with responsive design
- ✅ Hot Module Replacement (HMR) support

## Building for Production

Build all applications:

```bash
npm run build:all
```

Or build individually:

```bash
cd shell && npm run build
cd products && npm run build
cd cart && npm run build
```

## Development Tips

1. **Port Configuration**: Make sure ports 3000, 3001, and 3002 are available
2. **CORS**: Module Federation handles cross-origin loading automatically in development
3. **Hot Reload**: Changes in any microfrontend will hot-reload in the shell
4. **Independent Development**: Each microfrontend can be developed and tested independently

## Adding a New Microfrontend

1. Create a new directory (e.g., `checkout/`)
2. Set up a similar structure with `webpack.config.js` using Module Federation
3. Expose your component in the `exposes` configuration
4. Add the remote to the shell's `webpack.config.js`:
   ```javascript
   remotes: {
     checkout: "checkout@http://localhost:3003/remoteEntry.js",
   }
   ```
5. Import and use it in the shell's routing

## Troubleshooting

- **Module not found**: Ensure all applications are running
- **CORS errors**: Check that remote URLs are correct in webpack config
- **Version conflicts**: Ensure shared dependencies use compatible versions

## License

MIT
