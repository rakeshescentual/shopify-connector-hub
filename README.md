
# PreProduct Integration Platform

## Project Overview

This application manages and simulates PreProduct's integration with Shopify, providing a toolkit for merchants to handle product inventory, pre-order, backorder, and discontinued statuses.

**URL**: https://lovable.dev/projects/fcc19462-52bd-49e4-9221-abe224c18177

## Key Features

- **Product Status Management**: Intelligent handling of product statuses based on inventory, launch dates, and discontinuation
- **Integration Simulator**: Test your product configurations against our processing logic
- **Interactive Documentation**: Comprehensive guides on PreProduct rules and integration patterns
- **Shopify Connector**: Easy setup flow for connecting your Shopify store

## Technical Documentation

### Core Processing Logic

The application uses a hierarchical set of rules to process product variants:

1. **Variant Processing**: Each variant is analyzed using the rules in `variantProcessor.ts`
2. **Product-Level Logic**: Tags and QuickBuy status are determined based on variant states
3. **Status Prioritization**: Follows strict priority order (Discontinued > Launch Date > Notify Me > etc.)

### For Developers

The codebase is organized into the following key sections:

- `/contexts`: Contains the product context and processing logic
- `/components`: UI components including the interactive simulator
- `/pages`: Main application pages including simulator, rules documentation, and landing page

### Integration with Gadget.dev

This application is prepared for transfer to Gadget.dev with:

- Clean separation of business logic and UI
- TypeScript interfaces for all data models
- Comprehensive error handling and status tracking
- Well-documented processing rules

## How to Use the Application

### For Testing

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

### For Production

Deploy this application by opening [Lovable](https://lovable.dev/projects/fcc19462-52bd-49e4-9221-abe224c18177) and clicking on Share -> Publish.

## Custom Domain Setup

We don't support custom domains directly. If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## API Documentation

For detailed API documentation to integrate with Gadget.dev, refer to the [Integration Rules](/rules) section of the application.
