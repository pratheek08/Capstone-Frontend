# Capstone-Frontend: Azure DevOps Cloud Capstone Project - Frontend Application

This repository contains the source code for the user-facing React frontend application of the Azure DevOps and Cloud Capstone Project. This application serves as the primary interface for users to interact with the underlying microservices backend, which is deployed on Azure Kubernetes Service (AKS).

## 🌟 Project Goal

The primary goal of this repository is to develop a robust, responsive, and maintainable single-page application (SPA) using React, designed to consume APIs from the Capstone-Backend microservice. This frontend is an integral part of demonstrating a complete end-to-end DevOps lifecycle, including automated CI/CD to Azure Kubernetes Service.

## ✨ Key Technologies & Components

- **Frontend Framework**: React.js  
- **Styling**: Tailwind CSS (or other chosen CSS framework/methodology)  
- **State Management**: (e.g., React Context API, Redux, Zustand) - Specify if applicable  
- **API Communication**: Fetch API or Axios for interacting with the backend.  
- **Containerization**: Docker (for building the image for deployment to AKS).  

## 💡 Features of the Frontend Application

*(Replace these with actual features of your application)*

- **User Authentication/Authorization**: (e.g., Login, Registration, Session Management)  
- **Product Browsing**: Displaying products from the Product Catalog Service.  
- **Order Creation**: Allowing users to create new orders.  
- **Order Tracking**: Viewing the status and details of placed orders.  
- **Responsive Design**: Optimized for various screen sizes (desktop, tablet, mobile).  
- **Intuitive User Interface**: Clean and easy-to-navigate design.  

## 🚀 Getting Started

Follow these steps to set up and run the frontend application locally.

### Prerequisites

- Node.js (LTS version recommended) and npm or yarn installed.  
- Git installed.  
- Access to the Capstone-Backend service (running locally or deployed).  

### Installation

Clone the repository:

```bash
git clone https://github.com/pratheek08/Capstone-Frontend.git
cd Capstone-Frontend
```

Install dependencies:

```bash
npm install  # or yarn install
```

### Configuration

Create a `.env` file in the root directory of the project.

Add environment variables, especially for the backend API URL:

```
REACT_APP_BACKEND_API_URL=http://localhost:8080/api  # Adjust if your backend is elsewhere
```

### Running Locally

To start the development server:

```bash
npm start  # or yarn start
```

The application will typically open in your browser at `http://localhost:3000`.

## 📦 Deployment

This frontend application is designed to be containerized using Docker and deployed to Azure Kubernetes Service (AKS) via automated CI/CD pipelines configured in Azure DevOps.

A `Dockerfile` is included in this repository to build the application's Docker image:

```dockerfile
# Use a Node.js image to build the React application
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Use a lightweight Nginx image to serve the static build files
FROM nginx:alpine

# Copy the built React app to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration (optional, if you have one)
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

The CI pipeline builds this Docker image and pushes it to Azure Container Registry (ACR), while the CD pipeline deploys the image to AKS clusters in **Australia Central** and **Japan West**.

## 📂 Repository Structure

```
.
├── public/                  # Public assets (e.g., index.html, favicon)
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Top-level page components
│   ├── services/            # API interaction logic
│   ├── App.js               # Main application component
│   ├── index.js             # Entry point
│   ├── ...
├── .env.example             # Example environment variables
├── Dockerfile               # Docker configuration for containerization
├── package.json             # Project dependencies and scripts
├── yarn.lock                # Yarn lock file (if using yarn)
├── README.md                # This file
└── ...
```

## 🤝 Contributing

Contributions are welcome! If you find issues or have suggestions for improvements, please open an issue or submit a pull request following standard GitHub practices.
