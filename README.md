# Staff Commander

## Description

Staff Commander is a command-line application that allows users to manage departments, roles, and employees within an organization. It provides functionalities such as viewing all employees, roles, and departments, adding new departments, roles, and employees, updating employee roles and managers, and viewing total utilization by department.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd staff-commander

2. **Install Dependencies**
    ```bash
    npm install

3. **Set up the database:**
    1. Make sure you have a MySQL server running.
    2. Create a database and update the connection details in config/createConnection.js.
    3. Run the SQL script provided in db/schema.sql to create the necessary tables.

4.  **Start the application:**
    ```bash
    node index.js

## Usage

1. Upon starting the application, a welcome message will be displayed.
2. Use the main menu to navigate through different options.
3. Follow the prompts to perform various actions like viewing, adding, or updating information.
4. Choose "Quit" to exit the application.

## Dependencies

    - Inquirer - For command-line user interface.
    - Figlet - For ASCII art in the welcome message.

## License
    This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

    -Github repository:  https://github.com/Carmetlo/staff-commander
    -Video Demonstration:  

