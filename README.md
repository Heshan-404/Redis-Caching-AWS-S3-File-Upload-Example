# Redis Sample Express Project

This project demonstrates the integration of Redis caching and file uploads to AWS S3 using Node.js. It consists of two main functionalities:

1. **Redis Caching**: Caches blog posts in Redis to reduce the load on the API and improve performance.
2. **AWS S3 File Upload**: Allows users to upload files to an AWS S3 bucket and get the public URL for the uploaded file.

## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for building APIs and handling HTTP requests.
- **Redis**: In-memory data store used for caching blog posts.
- **AWS S3**: Cloud storage service for uploading and storing files.
- **Multer**: Middleware for handling `multipart/form-data` (used for file uploads).
- **Axios**: Promise-based HTTP client for making API requests.

## Setup Instructions

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/redis-sample-express-project.git
cd redis-sample-express-project
```


## Setup Instructions

### 2. Install dependencies:
Run the following command to install the necessary dependencies:
```bash
npm install
```


### 3. Configure AWS:
Update the aws-config.json file in the root of the project with your AWS S3 credentials and region.

```
{
  "AWS_ACCESS_KEY_ID": "your-access-key-id",
  "AWS_SECRET_ACCESS_KEY": "your-secret-access-key",
  "AWS_REGION": "us-east-1"
}
```

### 3. Redis Setup
Ensure Redis is installed and running locally, or configure it to connect to a remote Redis instance.

### 5. Start the application
You can start the Redis and AWS functionality separately by running:

```
npm run start_redis  # Starts the Redis caching functionality
```
```
npm run start_aws    # Starts the AWS S3 file upload functionality
```
