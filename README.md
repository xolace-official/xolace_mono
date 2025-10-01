![Xolace App](apps/xolace-app/assets/images/x-logo-full.webp)

# NEW! Xolace Monorepo

## What's Included

### Core Architecture

- 🏗️ Expo + React Native
- 🎨 NativeWind + Tailwind CSS +
  [React Native Reusable Components](https://rnr-docs.vercel.app/getting-started/introduction/)
- 🔐 Supabase authentication
- ✨ Full TypeScript + ESLint + Prettier configuration

### Key Features 

- 👤 User authentication flow
- ⚙️ User profile & settings
- 🔒 Protected routes

### Technologies

This repo core foundations:

- [Expo](https://expo.dev/) - React Native development environment
- [React Native](https://reactnative.dev/) - Cross-platform mobile development
- [Supabase](https://supabase.com/) - Authentication and database management
- [NativeWind](https://nativewind.dev/) - Tailwind CSS for React Native
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Native Reusable Components](https://rnr-docs.vercel.app/getting-started/introduction/) -
  Reusable React Native components
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [ESLint](https://eslint.org/) - Linting and code formatting
- [Prettier](https://prettier.io/) - Code formatting

## Preview

### Coming soon!

## Requirements

- Node.js 18.x
- pnpm
- Docker (for Supabase) or  connect to your remote Supabase

## Getting Started

Below are the steps to get started

### Installation

1. Clone the repository

```bash
git clone https://github.com/xolace-official/xolace_mono.git <your-project-name>
```

2. Install dependencies (always run installation from the root)

```bash
cd <your-project-name>
pnpm install
```

3. Create .env file

Using the .env.template file as a template, create a .env file in the `apps/xolace-app` directory

First:
```bash
cd apps/xolace-app
```

Second:
```bash
cp .env.template .env
```

Replace the `EXPO_PUBLIC_SUPABASE_API_URL` with a proxy if you are testing using a device connected to your computer.

4. Start the development server

```bash
pnpm dev
```

### NB: This will start a development build so you can press "s" to switch to Expo Go

5. Start Supabase (if you connected to remote you can skipp the following steps)

Run the following command to start Supabase:

```
pnpm run supabase:start
```

6. Stop Supabase

Run the following command to stop Supabase:

```
pnpm run supabase:stop
```

## Documentation

The documentation is not yet available.

## License

This project is licensed under the Private License. See the [LICENSE](LICENSE) file
for more details.
