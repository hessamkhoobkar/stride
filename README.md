# Stride

Welcome to **Stride**, a cutting-edge task management application designed to revolutionize team collaboration and organization. Stride seamlessly blends functionality with an intuitive interface, empowering teams to manage tasks efficiently and ensuring everyone stays on the same page in real-time.

## Features

- **Real-time Collaboration**: Stay updated with real-time changes using Websockets.
- **Task Management**: Create, assign, and track tasks easily.
- **Intuitive Interface**: User-friendly design for a smooth experience.
- **Form Validation**: Ensure data integrity with Yep form validation.
- **Responsive Design**: Tailwind CSS, Radix, and shadcn for a sleek and adaptive interface.

## Technologies Used

- **Frontend**: [Nuxt.js](https://nuxtjs.org/) - A progressive framework based on Vue.js.
- **Backend**: [Supabase](https://supabase.io/) - A powerful open-source Firebase alternative.
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
  - [Radix](https://www.radix-ui.com/) - Primitives for building high-quality, accessible design systems and web apps.
  - [shadcn](https://shadcn.dev/) - A component library for Tailwind CSS.
- **Real-time Communication**: Websockets - To enable real-time updates and synchronization.
- **Form Validation**: [Yep](https://yep.dev/) - A lightweight validation library.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Supabase account and project set up

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/hessamkhoobkar/stride
    ```

2. Navigate to the project directory:

    ```sh
    cd stride
    ```

3. Install dependencies:

    ```sh
    pnpm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add your Supabase credentials:

    ```sh
    SUPABASE_URL=your-supabase-url
    SUPABASE_KEY=your-supabase-key
    ```

### Running the Application

1. Start the development server:

    ```sh
    pnpm dev
    ```

2. Open your browser and navigate to:

    ```
    http://localhost:3000
    ```

### Building for Production

1. Build the application:

    ```sh
    pnpm build
    ```

2. Start the production server:

    ```sh
    pnpm preview
    ```

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for using Stride! We hope it enhances your team's productivity and collaboration.
