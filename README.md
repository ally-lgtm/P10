# P10 App - F1 Prediction Game

A mobile-first web application for Formula 1 fans to make strategic race predictions and compete with friends.

## Features

- 🏁 Predict the 10th place finisher, first retirement, and fastest lap for each race
- 🏆 Automatic scoring with bonus points
- 📊 Real-time leaderboards
- 👥 Private leagues for friendly competition
- 📱 Mobile-first design for on-the-go predictions

## Tech Stack

- **Frontend**: React PWA (Vite)
- **Backend**: Node.js with Express
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Hosting**: AWS Amplify (frontend) + AWS API Gateway/Lambda (API)

## Deployed Application

- **Live site (Amplify)**: [https://main.d1lzr92s882bej.amplifyapp.com](https://main.d1lzr92s882bej.amplifyapp.com)
- **API base URL (API Gateway)**: [https://c8dtsdalqd.execute-api.us-east-1.amazonaws.com](https://c8dtsdalqd.execute-api.us-east-1.amazonaws.com)

For a full list of live URLs and AWS resource IDs, see `docs/deployment.md`.

## Project Structure

```
P10/
├── client/          # React PWA (Vite)
├── api/             # Express API (Lambda wrapper + Serverless deploy)
├── supabase/        # Supabase resources
├── docs/            # Documentation
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Local Development

1. Clone the repository
2. Set up environment variables (see `.env.example` files in each directory)
   - For the client, ensure `VITE_API_BASE` points to your API (local or deployed).
3. Install dependencies:
   ```bash
   # Install API dependencies
   cd api
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```
4. Start the development servers:
   ```bash
   # Start API server
   cd api
   npm run dev
   
   # In a new terminal, start the client
   cd client
   npm run dev
   ```

### Troubleshooting

- **CORS errors in browser**
  - Ensure the API CORS origin matches exactly (no extra trailing slash).
  - Confirm `AMPLIFY_APP_ORIGIN` is set to the Amplify URL when deploying the API.

- **`npm run deploy` says “Missing script: deploy”**
  - The deploy script is under `api/`, run:
    - `npm run deploy --prefix api`
    - or `cd api && npm run deploy`

- **Serverless deploy fails because `SECRETS_ID` is missing**
  - You must set `SECRETS_ID` in your terminal when running deploy (example: `P10/api/prod`).

- **AWS CLI/credentials issues**
  - Validate credentials with: `aws sts get-caller-identity`

## Known Issues / Incomplete Features

- **Secrets exposure**: never commit or paste secret keys; rotate any keys that were exposed and update AWS Secrets Manager accordingly.
- **API timeout**: the API Lambda timeout is set to 30 seconds; long-running requests may time out.
- **Deployment automation**: API deploy is currently manual via Serverless CLI.

## Support

For support, contact: [ally@csuchico.edu](mailto:ally@csuchico.edu)

## Deployment

See `docs/deployment.md`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
