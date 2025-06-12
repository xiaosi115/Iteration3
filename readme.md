做一个官方网站，页面要美观，漂亮，，高级主题，是ar停车导航的
要有导航栏，网页页面开头要有滑块，能循环播放图片，实现注册、登录（待定，如果要做单做一个页面）提交反馈，网页显示个人数据之类，，留一个网页介绍团队。提供下载apk链接，

官网售卖的产品的基本资料：
目标：开发基于增强现实（AR）的车辆定位系统，使用户能够快速有效地定位大型停车设施中的停放车辆，提高整体用户便利性和导航效率。目标：实现AR导航，使用真实世界的叠加来引导用户找到他们停放的车辆。集成GPS，蓝牙和计算机视觉，确保准确的车辆位置跟踪。开发一个用户友好的移动应用程序（iOS和Android），支持汽车位置记录，路径优化和实时导航等功能。建立定位数据管理和导航算法优化的后端系统。适用范围：适用于商场、机场、体育馆、写字楼等大型停车设施。支持室内（基于Wi-Fi/蓝牙定位）和室外（基于gps定位）停车场景。通过基于计算机视觉的识别实现手动汽车位置标记和自动检测。



简略使用教程
车辆搜索与跟踪
输入车牌号码或扫描二维码检索车辆位置。
使用ar导航系统在停车场内逐步导航。
实时停车数据访问
在到达前检查现场停车情况。
查看详细信息，如停车费，持续时间和设施条件。
用户配置文件和个性化
创建和管理个人帐户来存储汽车详细信息。
启用自定义提醒通知（例如，“您的免费停车将在15分钟内到期”）。
提醒和通知
接收关于停车状态、汽车运动或安全问题的实时警报。
当新的停车促销或折扣可用时，得到通知。
安全与认证
确保网上支付的安全登录和加密交易。
使用生物识别认证（面部ID，指纹）保护账户。


The CARS Application is designed to assist users in finding their parked cars in parking lots using Augmented Reality (AR) technology. In Iteration 1, we focused on building the framework for the AR navigation module and setting up the server framework for user authentication and data management. This reference manual outlines the technologies, system architecture, and tools used in the development of the CARS Application, aimed at developers and system maintainers.

2. System Architecture
2.1 Front-End Architecture: AR Navigation Module
1. Technology Stack:
- Unity 2018.4.14c1: Used to develop the AR navigation module, which provides the AR functionality.
- C#: The primary scripting language used within Unity to write logic and interaction scripts for the AR module.
- AR Foundation: A cross-platform framework used to integrate ARCore (Android) for AR functionality, ensuring the application works on Android devices.

2. Key Features:
- AR Navigation Framework: Provides the core AR functionality, allowing users to visualize the parking lot layout and their path to a parked car.
- Parking Lot Layout Display: Displays the layout of the parking lot, including parking spots, entrances, and exits, through AR markers.
- Real-Time Path Planning: While the AR path guidance is in place, future iterations will integrate dynamic path planning to enhance user navigation accuracy.

3. Framework Setup:
- The AR environment has been configured in Unity, and the AR camera control system is set up, allowing users to see real-time AR data through their device’s camera.
- Basic AR path guidance has been established and will be refined in subsequent iterations.
2.2 Back-End Architecture: Server Framework
1. Technology Stack:
- Node.js (v14.x): Used for building the back-end server, which handles user requests and interacts with the database.
- Express.js: A web framework used with Node.js to create API endpoints.
- MySQL: A relational database used for storing user information, parking lot data, and vehicle locations.

2. Key Features:
- User Authentication: Supports user registration, login, and JWT (JSON Web Token) authentication to secure access.
- Parking Lot Data Management: Manages parking lot data, including parking spot locations, available spots, and parking lot layout.
- API Endpoints: Provides essential RESTful API endpoints to interact with the front-end and provide the necessary data for the app.

3. Framework Setup:
- The back-end was built using Node.js and Express.js to handle requests such as user login and parking lot data retrieval.
- A MySQL database has been set up to store user credentials, parking lot data, and vehicle location data.
- JWT authentication has been implemented to secure user access and ensure safe API usage.
3. System Design and Components
3.1 Database Design
The database design for the CARS application is structured to store essential data about users, parking lots, and vehicles. The database ensures efficient storage and retrieval of data, allowing the system to scale and handle large amounts of information as the app grows.

1. User Table:
- user_i (Primary Key): A unique identifier for each user.
- username: The username chosen by the user.
- password_hash: A securely hashed version of the user's password.
- email: The user's email address.
- created_at: The timestamp when the account was created.

2. Parking Lot Table:
- lot_id (Primary Key): A unique identifier for each parking lot.
- location_name: Name or identifier of the parking lot.
- latitude: Latitude coordinate for the parking lot location.
- longitude: Longitude coordinate for the parking lot location.
- parking_spots_count: The total number of parking spots available in the parking lot.

3. Vehicle Location Table:
- vehicle_id (Primary Key): A unique identifier for each vehicle.
- user_id (Foreign Key): The ID of the user who owns the vehicle.
- vehicle_type: Type of vehicle (e.g., sedan, SUV).
- vehicle_location: The current location of the vehicle in latitude and longitude.
3.2 API Endpoints
The CARS application provides several key API endpoints that allow communication between the front-end and back-end systems. These endpoints handle user requests, parking lot data retrieval, and path planning information.

1. POST /login: Allows users to log in with their credentials. Returns a JWT token for authenticated access.
2. POST /register: Registers a new user in the system. Accepts username, password, and email.
3. GET /parking-lot: Retrieves data about the parking lot, such as layout and available parking spots.
4. GET /navigate: Provides path planning data based on the user's current location and their target parking spot.
4. Security and Maintenance
4.1 Security Considerations
The CARS application uses JWT authentication to ensure secure access to user data and system resources. The system also ensures that sensitive user data, such as passwords, are securely hashed and not stored in plaintext.

1. JWT Authentication: Users must log in with valid credentials to receive a JWT token, which is used to authenticate subsequent requests.
2. Password Hashing: User passwords are hashed using secure hashing algorithms to ensure data security.
3. Encryption: Sensitive data transmitted between the front-end and back-end is encrypted using standard HTTPS protocols.

The system also implements basic error handling and logging mechanisms to monitor and protect against unauthorized access or malicious activities.
4.2 Database and Backup
The MySQL database stores all critical data, including user information and parking lot data. The database has been designed for high performance and scalability. Regular backups are performed to ensure that data is not lost in the event of system failure.

1. Database Backup: Periodic backups of the database are scheduled to ensure data integrity.
2. Scalability: The database schema is designed to scale as the system grows, allowing for the addition of new parking lots and vehicles without performance degradation.

5. Future Improvements
While Iteration 1 has laid the groundwork for the CARS Application, several improvements and new features are planned for future iterations:

1. Dynamic Path Planning: Future versions of the AR navigation system will integrate real-time path planning based on available parking spots.
2. User History and Preferences: Allow users to view their parking history and preferences, such as preferred parking locations.
3. Enhanced Security: Implement two-factor authentication for added security, especially for user accounts with sensitive information.
4. Performance Optimization: Optimize the system for higher concurrency and faster response times as the user base grows.
6. Conclusion
This reference manual provides detailed information on the architecture, components, and tools used in the development of the CARS application. As we continue to build on the foundation established in Iteration 1, the system will evolve with enhanced features, improved performance, and more secure functionalities. All developers and maintainers should refer to this document for understanding the structure and operational procedures of the system.


