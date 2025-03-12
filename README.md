
# PreProduct Integration Platform

## Project Overview

This application manages and simulates PreProduct's integration with Shopify, providing a toolkit for merchants to handle product inventory, pre-order, backorder, and discontinued statuses. It's built to be compatible with Gadget.dev and meets Shopify's "Built for Shopify" and Plus certification requirements.

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

### Shopify App Requirements Compliance

This app is designed to meet all [Built for Shopify requirements](https://shopify.dev/docs/apps/launch/built-for-shopify/requirements):

- **Security**: Implements secure OAuth flow and token storage
- **Performance**: Optimized API calls with proper rate limit handling
- **User Experience**: Clear merchant onboarding and intuitive UI
- **Documentation**: Comprehensive help docs and integration guides
- **Support**: Support channels and contact information provided
- **Quality**: Thorough testing for all core functionality

### Shopify Plus Certification Compliance

This app is designed to meet all [Shopify Plus Certification Program requirements](https://help.shopify.com/en/partners/plus-certified-app-program/certification):

- **Enterprise Features**: Support for high-volume merchants
- **Reliability**: 99.9% uptime commitment with monitoring
- **Scalability**: Designed to handle large product catalogs
- **Support SLAs**: Priority support channels for Plus merchants
- **Security Compliance**: Regular security audits and GDPR compliance

## Integration with Gadget.dev

### Latest Gadget Features Used

This application is optimized for the latest Gadget.dev features:

- **Enhanced Effect Builder**: For real-time validation and improved error handling
- **Field-Level Permissions**: Granular access control for sensitive data
- **Environment Variable Management**: Secure handling of API keys and secrets
- **TypeScript Integration**: Leveraging auto-generated types for type safety
- **Performance Optimizations**: Following Gadget's latest best practices

For detailed instructions on transitioning to Gadget.dev, see the [Developer Documentation](/documentation) page in the application.

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
