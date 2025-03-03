# Advertisement Portal Project

## Overview
This project is a personal advertisement portal that uses Django DRF for the backend and React with Redux for the frontend. It includes features for posting advertisements, user management, and asynchronous task handling with Celery.

## Features
- Advertisement Posting
- User Management
- Asynchronous Task Handling
- Custom Command for Running Celery
- Integration with Redis Server on WSL

## Technologies Used
- Django DRF
- React
- Redux
- Celery
- Redis

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/asiebHasan/adx.git
    ```
2. Navigate to the project directory:
    ```sh
    cd adx
    ```
3. Install backend dependencies:
    ```sh
    pip install -r requirements.txt
    ```
4. Install frontend dependencies:
    ```sh
    cd frontend
    npm install
    ```

## Usage
1. Start the Redis server on WSL:
    ```sh
    redis-server
    ```
2. Start the Celery worker:
    ```sh
    python manage.py runcelery
    ```
3. Start the Django server:
    ```sh
    python manage.py runserver
    ```
4. Start the React development server:
    ```sh
    cd frontend
    npm start
    ```
5. Access the application at `http://localhost:3000`

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please contact [your email].
