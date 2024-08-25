# Custom Shopify CMS App for Jewelry Store

## Overview

This project is a custom-built CMS (Content Management System) app for a jewelry store, integrated with Shopify. The app is designed to manage and automate the pricing of jewelry products based on real-time changes in metal and stone prices. It utilizes the Shopify GraphQL API and Payload CMS to provide a seamless experience for store managers.

## Key Features

- **Dynamic Pricing:** Automatically updates product prices on the Shopify store based on changes in gold, silver, or diamond prices entered in the CMS.
- **Auto-Calculation of Metal Prices:** Calculates product prices using the weight and purity of metals (gold, silver, etc.) stored in the Shopify product metadata. The app adjusts prices according to the grams of metal and its purity level.
- **Stone Pricing Integration:** Automatically calculates and integrates stone prices with the metal, ensuring accurate pricing of products that include gemstones.

## Technology Stack

- **Shopify GraphQL API:** Used to interact with the Shopify store and manage product data.
- **Payload CMS:** Serves as the content management system where users can update metal and stone prices.
- **Shopify Metadata:** Stores information about the purity and weight of metals used in products.

## Installation

1. Clone this repository.
   ```bash
   git clone https://github.com/your-repository.git
   ```

2. Navigate to the project directory.
   ```bash
   cd your-repository
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

4. Set up environment variables for Shopify API access and Payload CMS.

5. Run the app.
   ```bash
   npm run dev
   ```

## Usage

1. Access the CMS dashboard to input or update the prices of metals (gold, silver, diamond, etc.).
2. The app will automatically update the product prices on the Shopify store based on the entered values.
3. The app calculates the final price of jewelry products by considering the weight and purity of the metal as well as the type and value of stones used.