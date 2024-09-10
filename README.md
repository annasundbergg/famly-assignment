# Nursery Web Application 🌻

## Overview

This web application is created to help nurseries manage the check-in and check-out process of children. When parents arrive to drop their children off, they select a pick-up time and check in the child, and check them out when picking them up. The application integrates with an API to fetch data about registered children.

## Features

- **API Integration:** Fetch data about registered children from an API using an access token.
- **Check-in/Check-out:** Display lists of children, depending on if they are currently checked in or checked out.
- **Check-in Process:**
  - If a child is not checked in, parents can select a pick-up time.
  - Press the "Check In" button to register the child as checked in.
- **Check-out Process:**
  - When picking up the child, press the "Check Out" button to mark the child as checked out.

## Technologies Used

React and TypeScript. For simplicity, no other frameworks were used.

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/annasundbergg/famly-assignment
   cd famly-assignment
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure the API key

   - Add your accesstoken to a `.env` file or directly in the configuration.

4. Run the application
   ```bash
   npm start
   ```
