# Issue Status Example

This is an example of how to use the `issue-status` package to create a status page.

## Getting Started

1. Install the package:
```bash
npm install -g issue-status
```

2. Create a new config file:
```bash
issue-status init
```

3. Edit `issue-status.config.ts` to configure your status page

4. Build your status page:
```bash
issue-status build
```

5. Or start a development server:
```bash
issue-status dev
```

## Configuration

See `issue-status.config.ts` for a complete example configuration that includes:

- Custom site name and description
- Static data provider with sample components and incidents
- Footer customization

## Output

The `issue-status build` command will generate a static site in the `./dist` directory that you can deploy anywhere.