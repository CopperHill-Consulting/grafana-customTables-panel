## CopperHill Custom Table Panel Plugin for Grafana

Create highly customizable tables in Grafana.

## Installation

clone this repository into your plugin directory

```
git clone https://github.com/CopperHill-Consulting/grafana-customTables-panel.git
brew services restart grafana
```

## License
MIT

### Building this plugin

This plugin leverages the grafana-toolkit to simplify building and packaging a plugin.

Change to a compatible version of NodeJS:
```BASH
nvm use 12
```

Install module dependencies:

```BASH
yarn
```

Build plugin in production mode:

```BASH
yarn build
```

Build plugin in development mode:

```BASH
yarn dev
```

Build plugin in development mode, watching for changes:

```BASH
yarn watch
```
