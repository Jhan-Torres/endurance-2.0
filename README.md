# Endurance

The Ultimate Password Manager with enterprise-grade security and privacy-first approach.

## 🔐 Features

### Password Management

- **Smart Password Generation**: Create cryptographically secure passwords with customizable options
- **Real-time Strength Analysis**: Get instant feedback on password security
- **Zero-Knowledge Architecture**: Your data never leaves your device
- **Lightning-fast Search**: Find passwords instantly with smart search
- **One-click Copy**: Quick access to your credentials
- **Smart Organization**: Categories and intelligent sorting

### Secure Notes

- **Encrypted Storage**: Store sensitive information securely
- **Tag System**: Organize notes with tags and categories
- **Pin Important Notes**: Quick access to frequently used information
- **Full-text Search**: Find content across all notes instantly

## 🛡️ Security

- **Local-only Storage**: Everything stored locally in your browser
- **No Cloud Dependencies**: Complete offline functionality
- **Encrypted Data**: All information encrypted before storage
- **No Data Collection**: Your privacy is our priority

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/endurance.git
cd endurance
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Architecture

This project follows Clean Architecture principles:

- **Domain Layer**: Business entities and use cases
- **Infrastructure Layer**: Data storage and external services
- **Presentation Layer**: Vue.js components and composables

The codebase uses barrel index patterns for clean, organized imports throughout all TypeScript modules.

See [ARCHITECTURE.md](./ARCHITECTURE.md) and [BARREL_INDEXES.md](./BARREL_INDEXES.md) for detailed documentation.

## 🛠️ Technologies

- **Vue.js 3**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **Vue Router**: Official router for Vue.js

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security Notice

This application stores all data locally in your browser. While we use encryption for stored data, please ensure you:

- Use a secure device
- Keep your browser updated
- Regularly backup your data
- Use strong master passwords for important accounts

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/endurance/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

---

**Remember**: Your security is in your hands. Use strong, unique passwords for all your accounts!
