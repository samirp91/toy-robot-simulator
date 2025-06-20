# Toy Robot Simulator

A NestJS application with React Router 7 frontend for simulating a toy robot on a 5x5 grid.

## Description

This application simulates a toy robot moving on a 5x5 grid. The robot can be placed, moved, rotated, and its position can be reported. Position history is stored in a SQLite database.

## Features

- Place robot on a 5x5 grid
- Move robot forward in current direction
- Rotate robot left or right
- Report current position and direction
- Store and retrieve position history
- REST API endpoints for robot control

## API Endpoints

- `POST /api/position-history` - Create position history
- `GET /api/position-history/last-position/:id` - Get last position for user

## Getting Started

### Installing

- Clone the repository
- Navigate to the project directory
- Install dependencies: `pnpm i`

### Running

- Start the server: `cd apps/server && pnpm dev`
- Visit `http://localhost:4003` in your browser
- Database file will be created at `apps/server/dist/database/mysqlitedatabase.db`

### Database

The application uses SQLite with Sequelize ORM. To view database tables:

```bash
sqlite3 apps/server/dist/database/mysqlitedatabase.db ".tables"
```

## Repository Structure

- `apps/server/` - NestJS backend with React Router 7 frontend
- `tools/` - Build and development utilities

We welcome contributions from the community! Please consider the following:

- Follow the code style and linting guidelines.
- Write clear commit messages.
- Include tests for new features or bug fixes.
- Open issues to discuss major changes before implementing them.
- Feel free to open a pull request with improvements.

For more details, check the [CONTRIBUTING.md](CONTRIBUTING.md) if available or contact the maintainers.

## Authors

[Sergio Leon](https://cbnsndwch.io)
Based off https://github.com/cbnsndwch/react-router-nest

## License

This project is licensed under the MIT license. See [LICENSE.md](LICENSE.md) for details.

[React Router 7]: https://reactrouter.com/home
[Turbo]: https://turbo.build/docs
[PNPM]: https://pnpm.io/
[NestJS]: https://docs.nestjs.com/
