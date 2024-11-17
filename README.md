# Investment Tracker

## Demo
[https://ivtracker.vercel.app/](https://ivtracker.vercel.app)

## Overview

Investment Tracker is a web application that allows users to calculate and track their investments, supporting both simple and compound interest calculations. The app provides a user-friendly interface for adding investments, selecting currencies, and viewing a list of tracked investments.

While using this app, you will get a great insight into the power of compounding and how a simple reinvestment strategy greatly differs monetarily from a simple interest investments. Enjoy!  

## Features

- Add investments with customizable parameters:
  - Principal amount
  - Interest rate
  - Start and end dates
  - Interest type (simple or compound)
  - Investment type (daily or annually)
  - Currency selection with flags
- Calculate expected returns based on input parameters
- View a list of all added investments
- Delete investments from the list
- Responsive design for various screen sizes

## Technologies Used

- React
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui components
- date-fns for date manipulation

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/ccthecode/investment-tracker.git
   cd investment-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. **Adding an Investment**
   - Fill in the investment details in the form:
     - Principal amount
     - Select currency
     - Interest rate
     - Choose investment type (daily or annually)
     - Select start and end dates (if applicable)
     - Choose interest type (simple or compound)
   - Click "Add Investment" to add it to your list

2. **Viewing Investments**
   - Scroll down to see the table of all added investments
   - The table displays all relevant information, including expected returns

3. **Deleting an Investment**
   - Click the "X" button in the last column to remove an investment from the list

4. **Customizing Investment Period**
   - For annual investments, you can toggle the "Select Investment Period less than 365 days" switch to customize the investment period

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
