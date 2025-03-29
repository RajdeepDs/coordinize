# Contributing to Coordinize

Thank you for your interest in contributing to Coordinize! We're excited to have you join our mission to create an open-source communication platform that prioritizes privacy, transparency, and user empowerment.

## Getting Started

To get started with contributing to Coordinize, follow these steps:

1. **Fork the Repository**
   - Click the 'Fork' button at the top right of this repository
   - Clone your fork locally:
2. **Set Up Development Environment**
   - Install [Bun](https://bun.sh)
   - Clone the repository and install dependencies: `bun install`
   - Copy `.env.example` to `.env.local`.
   - Start the database locally: `bun docker:up`

## Development Workflow

1. **Start the Development Environment**

   ```bash
   # Start database locally
   bun docker:up

   # Start the development server
   bun dev
   ```

2. **Create a New Branch**

   Always create a new branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**

   - Write clean, maintainable code
   - Follow our coding standards
   - Add/update tests as needed
   - Update documentation if required

4. **Test Your Changes**

   - Make sure the app runs without errors
   - Test your feature thoroughly

5. **Commit Your Changes**

   - Use clear, descriptive commit messages
   - Reference issues and pull requests

   ```bash
   git commit -m "feat: add new post feature

   Implements #123"
   ```

6. **Stay Updated**

   Keep your fork in sync with the main repository:

   ```bash
   git fetch upstream
   git merge upstream/main
   ```

7. **Push to Your Fork**

   ```bash
   git push origin your-branch-name
   ```

8. **Submit a Pull Request**
   - Go to your fork on GitHub and click "New Pull Request"
   - Fill out the PR template completely
   - Link any relevant issues
   - Add screenshots for UI changes

## Database Management

Coordinize uses PostgreSQL with Prisma ORM. Here's how to work with it:

1. **Database Structure**

   The database schema is defined in the `packages/database/prisma` directory.

2. **Common Database Tasks**

   ```bash
   # Apply migrations
   bun db:migrate

   # View and edit data with Prisma Studio
   bun db:studio
   ```

3. **Database Connection**

   Make sure your database connection string is in:

   - `packages/database/.env`

   For local development:

   ```bash
   DATABASE_URL="postgres://postgres:postgres@localhost:5432/coordinize"
   ```

4. **Troubleshooting**

   - **Connection Issues**: Make sure Docker is running
   - **Schema Errors**: Check your schema files for errors

## Code Style

- Follow the existing code formatting in the project (ensure you have Biome installed)
- Write clear, self-documenting code
- Add comments only when necessary to explain complex logic
- Use meaningful variable and function names

## Testing

- Write unit tests for new features
- Update existing tests when modifying features
- Ensure all tests pass before submitting PR
- Include integration tests for complex features
- Test edge cases and error scenarios

## Documentation

- Update README.md if needed
- Document new features and APIs
- Include JSDoc comments for functions
- Update API documentation
- Add comments for complex logic

## Areas of Contribution

We welcome contributions in various areas:

- 🛠️ Development
- 🎨 UI/UX Improvements
- 🔒 Security Enhancements
- ⚡ Performance Optimizations
- 📝 Documentation
- 🐛 Bug Fixes
- ✨ New Features
- 🧪 Testing

## Reporting Issues

- Use the GitHub issue tracker
- Check if the issue already exists before creating a new one
- Provide a clear description of the issue
- Include steps to reproduce if applicable

## Community

- Join our discussions in GitHub Issues
- Help others in the community
- Share your ideas and feedback
- Be respectful and inclusive
- Follow our Code of Conduct

## Questions or Need Help?

If you have questions or need help, you can:

1. Check our documentation
2. Open a GitHub issue
3. Join our community discussions

---

Thank you for contributing to Coordinize! 🚀
