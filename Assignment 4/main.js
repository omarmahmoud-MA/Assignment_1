// Q1
// const express = require('express');
// const fs = require('fs').promises;
// const path = require('path');
// const app = express();
// const PORT = 3000;
// const USERS_FILE = 'users.json';
// app.use(express.json());
// async function initializeUsersFile() {
//     try {
//         await fs.access(USERS_FILE);
//     } catch (error) {
//         await fs.writeFile(USERS_FILE, JSON.stringify([]));
//     }
// }
// app.post('/user', async (req, res) => {
//     try {
//         const { name, age, email } = req.body;
//         if (!name || !age || !email) {
//             return res.status(400).json({ 
//                 message: 'Please provide name, age, and email.' 
//             });
//         }
//         const usersData = await fs.readFile(USERS_FILE, 'utf8');
//         const users = JSON.parse(usersData);
//         const emailExists = users.some(user => user.email === email);
//         if (emailExists) {
//             return res.status(400).json({ 
//                 message: 'Email already exists.' 
//             });
//         }
//         const newUser = {
//             id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
//             name,
//             age,
//             email
//         };
//         users.push(newUser);
//         await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
//         res.status(201).json({ 
//             message: 'User added successfully.' 
//         });
//     } catch (error) {
//         console.error('Error adding user:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.listen(PORT, async () => {
//     await initializeUsersFile();
//     console.log(`Server is running on http://localhost:${PORT}`);
// });





// Q2
// const express = require('express');
// const fs = require('fs').promises;
// const app = express();
// const PORT = 3000;
// const USERS_FILE = 'users.json';
// app.use(express.json());
// async function initializeUsersFile() {
//     try {
//         await fs.access(USERS_FILE);
//         console.log('users.json already exists');
//     } catch (error) {
//         await fs.writeFile(USERS_FILE, JSON.stringify([]));
//         console.log('Created users.json file');
//     }
// }
// async function readUsers() {
//     try {
//         const usersData = await fs.readFile(USERS_FILE, 'utf8');
//         return JSON.parse(usersData);
//     } catch (error) {
//         console.error('Error reading users:', error);
//         return [];
//     }
// }
// async function writeUsers(users) {
//     try {
//         await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
//         return true;
//     } catch (error) {
//         console.error('Error writing users:', error);
//         return false;
//     }
// }
// app.post('/user', async (req, res) => {
//     try {
//         const { name, age, email } = req.body;
//         if (!name || !age || !email) {
//             return res.status(400).json({ 
//                 message: 'Please provide name, age, and email.' 
//             });
//         }
//         const users = await readUsers();
//         const emailExists = users.some(user => user.email === email);
//         if (emailExists) {
//             return res.status(400).json({ 
//                 message: 'Email already exists.' 
//             });
//         }
//         const newUser = {
//             id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
//             name,
//             age,
//             email
//         };
//         users.push(newUser);
//         const success = await writeUsers(users);
//         if (!success) {
//             return res.status(500).json({ 
//                 message: 'Error saving user to file.' 
//             });
//         }
//         res.status(201).json({ 
//             message: 'User added successfully.' 
//         });
//     } catch (error) {
//         console.error('Error adding user:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.patch('/user/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id);
//         const updates = req.body;
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Invalid user ID. ID must be a number.' 
//             });
//         }
//         if (!updates || Object.keys(updates).length === 0) {
//             return res.status(400).json({ 
//                 message: 'No update data provided.' 
//             });
//         }
//         const allowedUpdates = ['name', 'age', 'email'];
//         const invalidFields = Object.keys(updates).filter(
//             field => !allowedUpdates.includes(field)
//         );
//         if (invalidFields.length > 0) {
//             return res.status(400).json({ 
//                 message: `Invalid field(s): ${invalidFields.join(', ')}. Only name, age, and email can be updated.` 
//             });
//         }
//         const users = await readUsers();
//         const userIndex = users.findIndex(user => user.id === userId);
        
//         if (userIndex === -1) {
//             return res.status(404).json({ 
//                 message: 'User ID not found.' 
//             });
//         }
//         if (updates.email && updates.email !== users[userIndex].email) {
//             const emailExists = users.some(
//                 user => user.email === updates.email && user.id !== userId
//             );
            
//             if (emailExists) {
//                 return res.status(400).json({ 
//                     message: 'Email already exists.' 
//                 });
//             }
//         }
//         const originalUser = { ...users[userIndex] };
//         users[userIndex] = {
//             ...users[userIndex],
//             ...updates
//         };
//         const success = await writeUsers(users);
        
//         if (!success) {
//             return res.status(500).json({ 
//                 message: 'Error saving updated user to file.' 
//             });
//         }
//         let message = 'User ';
//         const updatedFields = Object.keys(updates);
        
//         if (updatedFields.length === 1) {
//             message += `${updatedFields[0]} updated successfully.`;
//         } else {
//             message += 'updated successfully.';
//         }
//         res.json({ 
//             message: message,
//             updatedFields: updatedFields,
//             beforeUpdate: originalUser,
//             afterUpdate: users[userIndex]
//         });
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.listen(PORT, async () => {
//     await initializeUsersFile();
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(`POST endpoint: POST http://localhost:${PORT}/user`);
//     console.log(`PATCH endpoint: PATCH http://localhost:${PORT}/user/:id`);
// });





// Q3
// const express = require('express');
// const fs = require('fs').promises;
// const app = express();
// const PORT = 3000;
// const USERS_FILE = 'users.json';
// app.use((req, res, next) => {
//     res.setHeader('Content-Type', 'application/json; charset=utf-8');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     if (req.method === 'OPTIONS') {
//         return res.status(200).end();
//     }
//     next();
// });
// app.use(express.json());
// async function initializeUsersFile() {
//     try {
//         await fs.access(USERS_FILE);
//         console.log('users.json already exists');
//     } catch (error) {
//         await fs.writeFile(USERS_FILE, JSON.stringify([]));
//         console.log('Created users.json file');
//     }
// }
// async function readUsers() {
//     try {
//         const usersData = await fs.readFile(USERS_FILE, 'utf8');
//         return JSON.parse(usersData);
//     } catch (error) {
//         console.error('Error reading users:', error);
//         return [];
//     }
// }
// async function writeUsers(users) {
//     try {
//         await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
//         return true;
//     } catch (error) {
//         console.error('Error writing users:', error);
//         return false;
//     }
// }
// app.post('/user', async (req, res) => {
//     try {
//         const { name, age, email } = req.body;
//         if (!name || !age || !email) {
//             return res.status(400).json({ 
//                 message: 'Please provide name, age, and email.' 
//             });
//         }
//         const users = await readUsers();
//         const emailExists = users.some(user => user.email === email);
//         if (emailExists) {
//             return res.status(400).json({ 
//                 message: 'Email already exists.' 
//             });
//         }
//         const newUser = {
//             id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
//             name,
//             age,
//             email
//         };
//         users.push(newUser);
//         const success = await writeUsers(users);
//         if (!success) {
//             return res.status(500).json({ 
//                 message: 'Error saving user to file.' 
//             });
//         }
//         res.status(201).json({ 
//             message: 'User added successfully.',
//             user: newUser
//         });
//     } catch (error) {
//         console.error('Error adding user:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.patch('/user/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id);
//         const updates = req.body;
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Invalid user ID. ID must be a number.' 
//             });
//         }
//         if (!updates || Object.keys(updates).length === 0) {
//             return res.status(400).json({ 
//                 message: 'No update data provided.' 
//             });
//         }
//         const allowedUpdates = ['name', 'age', 'email'];
//         const invalidFields = Object.keys(updates).filter(
//             field => !allowedUpdates.includes(field)
//         );
//         if (invalidFields.length > 0) {
//             return res.status(400).json({ 
//                 message: `Invalid field(s): ${invalidFields.join(', ')}. Only name, age, and email can be updated.` 
//             });
//         }
//         const users = await readUsers();
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).json({ 
//                 message: 'User ID not found.' 
//             });
//         }
//         if (updates.email && updates.email !== users[userIndex].email) {
//             const emailExists = users.some(
//                 user => user.email === updates.email && user.id !== userId
//             );
//             if (emailExists) {
//                 return res.status(400).json({ 
//                     message: 'Email already exists.' 
//                 });
//             }
//         }
//         users[userIndex] = {
//             ...users[userIndex],
//             ...updates
//         };
//         const success = await writeUsers(users);
//         if (!success) {
//             return res.status(500).json({ 
//                 message: 'Error saving updated user to file.' 
//             });
//         }
//         let message = 'User ';
//         const updatedFields = Object.keys(updates);
//         if (updatedFields.length === 1) {
//             message += `${updatedFields[0]} updated successfully.`;
//         } else {
//             message += 'updated successfully.';
//         }
//         res.json({ 
//             message: message
//         });
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.delete('/user/:id', async (req, res) => {
//     try {
//         let userId = parseInt(req.params.id);
//         if (isNaN(userId)) {
//             userId = parseInt(req.body.id);
//         }
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Please provide a valid user ID either in the URL or request body.' 
//             });
//         }
//         const users = await readUsers();
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).json({ 
//                 message: 'User ID not found.' 
//             });
//         }
//         const deletedUser = users[userIndex];
//         users.splice(userIndex, 1);
//         const success = await writeUsers(users);
//         if (!success) {
//             return res.status(500).json({ 
//                 message: 'Error saving changes to file.' 
//             });
//         }
//         res.json({ 
//             message: 'User deleted successfully.',
//             deletedUser: deletedUser
//         });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/users', async (req, res) => {
//     try {
//         const users = await readUsers();
//         res.json({
//             count: users.length,
//             users: users
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             message: 'Error reading users from file.' 
//         });
//     }
// });
// app.get('/user/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id);
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Invalid user ID.' 
//             });
//         }
//         const users = await readUsers();
//         const user = users.find(u => u.id === userId);
//         if (!user) {
//             return res.status(404).json({ 
//                 message: 'User not found.' 
//             });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ 
//             message: 'Error reading user.' 
//         });
//     }
// });
// app.get('/', (req, res) => {
//     res.json({
//         message: 'User Management API is running',
//         endpoints: {
//             'POST /user': 'Add new user',
//             'PATCH /user/:id': 'Update user by ID',
//             'DELETE /user/:id': 'Delete user by ID',
//             'GET /users': 'Get all users',
//             'GET /user/:id': 'Get user by ID'
//         }
//     });
// });
// app.listen(PORT, async () => {
//     await initializeUsersFile();
//     console.log(`✅ Server is running on http://localhost:${PORT}`);
//     console.log(`📝 POST  - Add user:     POST http://localhost:${PORT}/user`);
//     console.log(`✏️  PATCH - Update user: PATCH http://localhost:${PORT}/user/:id`);
//     console.log(`🗑️  DELETE - Delete user: DELETE http://localhost:${PORT}/user/:id`);
//     console.log(`📋 GET    - All users:   GET http://localhost:${PORT}/users`);
//     console.log(`👤 GET    - User by ID:  GET http://localhost:${PORT}/user/:id`);
// });





// Q4
// const express = require('express');
// const fs = require('fs').promises;
// const app = express();
// const PORT = 3000;
// const USERS_FILE = 'users.json';
// app.use((req, res, next) => {
//     res.setHeader('Content-Type', 'application/json; charset=utf-8');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     if (req.method === 'OPTIONS') {
//         return res.status(200).end();
//     }
//     next();
// });
// app.use(express.json());
// async function initializeUsersFile() {
//     try {
//         await fs.access(USERS_FILE);
//         console.log('users.json already exists');
//     } catch (error) {
//         await fs.writeFile(USERS_FILE, JSON.stringify([]));
//         console.log('Created users.json file');
//     }
// }
// async function readUsers() {
//     try {
//         const usersData = await fs.readFile(USERS_FILE, 'utf8');
//         return JSON.parse(usersData);
//     } catch (error) {
//         console.error('Error reading users:', error);
//         return [];
//     }
// }
// async function writeUsers(users) {
//     try {
//         await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
//         return true;
//     } catch (error) {
//         console.error('Error writing users:', error);
//         return false;
//     }
// }
// app.post('/user', async (req, res) => {
//     try {
//         const { name, age, email } = req.body;
//         if (!name || !age || !email) {
//             return res.status(400).json({ 
//                 message: 'Please provide name, age, and email.' 
//             });
//         }
//         const users = await readUsers();
//         const emailExists = users.some(user => user.email === email);
//         if (emailExists) {
//             return res.status(400).json({ 
//                 message: 'Email already exists.' 
//             });
//         }
//         const newUser = {
//             id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
//             name,
//             age,
//             email
//         };
//         users.push(newUser);
//         const success = await writeUsers(users);
//         if (!success) {
//             return res.status(500).json({ 
//                 message: 'Error saving user to file.' 
//             });
//         }
//         res.status(201).json({ 
//             message: 'User added successfully.',
//             user: newUser
//         });
//     } catch (error) {
//         console.error('Error adding user:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.patch('/user/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id);
//         const updates = req.body;
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Invalid user ID. ID must be a number.' 
//             });
//         }
//         if (!updates || Object.keys(updates).length === 0) {
//             return res.status(400).json({ 
//                 message: 'No update data provided.' 
//             });
//         }
//         const allowedUpdates = ['name', 'age', 'email'];
//         const invalidFields = Object.keys(updates).filter(
//             field => !allowedUpdates.includes(field)
//         );
//         if (invalidFields.length > 0) {
//             return res.status(400).json({ 
//                 message: `Invalid field(s): ${invalidFields.join(', ')}. Only name, age, and email can be updated.` 
//             });
//         }
//         const users = await readUsers();
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).json({ 
//                 message: 'User ID not found.' 
//             });
//         }
//         if (updates.email && updates.email !== users[userIndex].email) {
//             const emailExists = users.some(
//                 user => user.email === updates.email && user.id !== userId
//             );
            
//             if (emailExists) {
//                 return res.status(400).json({ 
//                     message: 'Email already exists.' 
//                 });
//             }
//         }
//         users[userIndex] = {
//             ...users[userIndex],
//             ...updates
//         };
//         const success = await writeUsers(users);
//         if (!success) {
//             return res.status(500).json({ 
//                 message: 'Error saving updated user to file.' 
//             });
//         }
//         let message = 'User ';
//         const updatedFields = Object.keys(updates);
//         if (updatedFields.length === 1) {
//             message += `${updatedFields[0]} updated successfully.`;
//         } else {
//             message += 'updated successfully.';
//         }
//         res.json({ 
//             message: message
//         });
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.delete('/user/:id', async (req, res) => {
//     try {
//         let userId = parseInt(req.params.id);
//         if (isNaN(userId)) {
//             userId = parseInt(req.body.id);
//         }
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Please provide a valid user ID either in the URL or request body.' 
//             });
//         }
//         const users = await readUsers();
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).json({ 
//                 message: 'User ID not found.' 
//             });
//         }
//         const deletedUser = users[userIndex];
//         users.splice(userIndex, 1);
//         const success = await writeUsers(users);
//         if (!success) {
//             return res.status(500).json({ 
//                 message: 'Error saving changes to file.' 
//             });
//         }
//         res.json({ 
//             message: 'User deleted successfully.',
//             deletedUser: deletedUser
//         });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/user/getByName', async (req, res) => {
//     try {
//         const userName = req.query.name;
//         if (!userName || userName.trim() === '') {
//             return res.status(400).json({ 
//                 message: 'Please provide a name parameter. Example: /user/getByName?name=ali' 
//             });
//         }
//         const users = await readUsers();
//         const foundUsers = users.filter(user => 
//             user.name.toLowerCase().includes(userName.toLowerCase())
//         );
//         if (foundUsers.length === 0) {
//             return res.status(404).json({ 
//                 message: 'User name not found.' 
//             });
//         }
//         const exactMatch = users.find(user => 
//             user.name.toLowerCase() === userName.toLowerCase()
//         );
//         if (exactMatch) {
//             res.json(exactMatch);
//         } else if (foundUsers.length === 1) {
//             res.json(foundUsers[0]);
//         } else {
//             res.json({
//                 message: `Found ${foundUsers.length} users with similar names`,
//                 searchTerm: userName,
//                 users: foundUsers
//             });
//         }
//     } catch (error) {
//         console.error('Error searching user by name:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/users', async (req, res) => {
//     try {
//         const users = await readUsers();
//         res.json({
//             count: users.length,
//             users: users
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             message: 'Error reading users from file.' 
//         });
//     }
// });
// app.get('/user/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id);
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Invalid user ID.' 
//             });
//         }
//         const users = await readUsers();
//         const user = users.find(u => u.id === userId);
//         if (!user) {
//             return res.status(404).json({ 
//                 message: 'User not found.' 
//             });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ 
//             message: 'Error reading user.' 
//         });
//     }
// });
// app.get('/', (req, res) => {
//     res.json({
//         message: 'User Management API is running',
//         endpoints: {
//             'POST /user': 'Add new user',
//             'PATCH /user/:id': 'Update user by ID',
//             'DELETE /user/:id': 'Delete user by ID',
//             'GET /user/getByName?name=...': 'Get user by name',
//             'GET /users': 'Get all users',
//             'GET /user/:id': 'Get user by ID'
//         }
//     });
// });
// app.listen(PORT, async () => {
//     await initializeUsersFile();
//     console.log(`✅ Server is running on http://localhost:${PORT}`);
//     console.log(`📝 POST  - Add user:          POST http://localhost:${PORT}/user`);
//     console.log(`✏️  PATCH - Update user:       PATCH http://localhost:${PORT}/user/:id`);
//     console.log(`🗑️  DELETE - Delete user:      DELETE http://localhost:${PORT}/user/:id`);
//     console.log(`🔍 GET    - Get user by name: GET http://localhost:${PORT}/user/getByName?name=...`);
//     console.log(`📋 GET    - All users:        GET http://localhost:${PORT}/users`);
//     console.log(`👤 GET    - User by ID:       GET http://localhost:${PORT}/user/:id`);
// });






// Q5
// const express = require('express');
// const fs = require('fs').promises;
// const app = express();
// const PORT = 3000;
// const USERS_FILE = 'users.json';
// app.use(express.json());
// async function initializeUsersFile() {
//     try {
//         await fs.access(USERS_FILE);
//         console.log('users.json file exists');
//     } catch (error) {
//         await fs.writeFile(USERS_FILE, JSON.stringify([]));
//         console.log('Created users.json file');
//     }
// }
// async function readUsers() {
//     try {
//         const usersData = await fs.readFile(USERS_FILE, 'utf8');
//         return JSON.parse(usersData);
//     } catch (error) {
//         console.error('Error reading file:', error);
//         return [];
//     }
// }
// async function writeUsers(users) {
//     try {
//         await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
//         return true;
//     } catch (error) {
//         console.error('Error writing file:', error);
//         return false;
//     }
// }
// app.post('/user', async (req, res) => {
//     try {
//         const { name, age, email } = req.body;
//         if (!name || !age || !email) {
//             return res.status(400).json({ 
//                 message: 'Please provide name, age, and email.' 
//             });
//         }
//         const users = await readUsers();
//         const emailExists = users.some(user => user.email === email);
//         if (emailExists) {
//             return res.status(400).json({ 
//                 message: 'Email already exists.' 
//             });
//         }
//         const newUser = {
//             id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
//             name,
//             age,
//             email
//         };
//         users.push(newUser);
//         await writeUsers(users);
//         res.status(201).json({ 
//             message: 'User added successfully.' 
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.patch('/user/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id);
//         const updates = req.body;
        
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Invalid user ID.' 
//             });
//         }
//         if (!updates || Object.keys(updates).length === 0) {
//             return res.status(400).json({ 
//                 message: 'No update data provided.' 
//             });
//         }
//         const allowedUpdates = ['name', 'age', 'email'];
//         const invalidFields = Object.keys(updates).filter(
//             field => !allowedUpdates.includes(field)
//         );
//         if (invalidFields.length > 0) {
//             return res.status(400).json({ 
//                 message: `Invalid field(s): ${invalidFields.join(', ')}` 
//             });
//         }
//         const users = await readUsers();
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).json({ 
//                 message: 'User ID not found.' 
//             });
//         }
//         if (updates.email && updates.email !== users[userIndex].email) {
//             const emailExists = users.some(
//                 user => user.email === updates.email && user.id !== userId
//             );
//             if (emailExists) {
//                 return res.status(400).json({ 
//                     message: 'Email already exists.' 
//                 });
//             }
//         }
//         users[userIndex] = { ...users[userIndex], ...updates };
//         await writeUsers(users);
//         let message = 'User updated successfully.';
//         const updatedFields = Object.keys(updates);
//         if (updatedFields.length === 1) {
//             message = `User ${updatedFields[0]} updated successfully.`;
//         }
//         res.json({ message: message });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.delete('/user/:id', async (req, res) => {
//     try {
//         let userId = parseInt(req.params.id);
//         if (isNaN(userId)) {
//             userId = parseInt(req.body.id);
//         }
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Please provide a valid user ID.' 
//             });
//         }
//         const users = await readUsers();
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).json({ 
//                 message: 'User ID not found.' 
//             });
//         }
//         users.splice(userIndex, 1);
//         await writeUsers(users);
//         res.json({ 
//             message: 'User deleted successfully.' 
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/user/getByName', async (req, res) => {
//     try {
//         const userName = req.query.name;
//         if (!userName || userName.trim() === '') {
//             return res.status(400).json({ 
//                 message: 'Please provide a name parameter.' 
//             });
//         }
//         const users = await readUsers();
//         const foundUsers = users.filter(user => 
//             user.name.toLowerCase().includes(userName.toLowerCase())
//         );
//         if (foundUsers.length === 0) {
//             return res.status(404).json({ 
//                 message: 'User name not found.' 
//             });
//         }
//         const exactMatch = users.find(user => 
//             user.name.toLowerCase() === userName.toLowerCase()
//         );
//         if (exactMatch) {
//             res.json(exactMatch);
//         } else if (foundUsers.length === 1) {
//             res.json(foundUsers[0]);
//         } else {
//             res.json(foundUsers);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/user', async (req, res) => {
//     try {
//         const users = await readUsers();
//         res.json(users); 
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/users', async (req, res) => {
//     try {
//         const users = await readUsers();
//         res.json({
//             count: users.length,
//             users: users
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             message: 'Error reading users.' 
//         });
//     }
// });
// app.get('/user/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id);
        
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Invalid user ID.' 
//             });
//         }
//         const users = await readUsers();
//         const user = users.find(u => u.id === userId);
//         if (!user) {
//             return res.status(404).json({ 
//                 message: 'User not found.' 
//             });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ 
//             message: 'Error reading user.' 
//         });
//     }
// });
// app.get('/', (req, res) => {
//     res.json({
//         message: 'User Management API',
//         endpoints: {
//             'POST /user': 'Add new user',
//             'GET /user': 'Get all users (array)',
//             'GET /user/:id': 'Get user by ID',
//             'GET /user/getByName?name=...': 'Search user by name',
//             'PATCH /user/:id': 'Update user',
//             'DELETE /user/:id': 'Delete user',
//             'GET /users': 'Get all users (with count)'
//         }
//     });
// });
// app.listen(PORT, async () => {
//     await initializeUsersFile();
//     console.log(`✅ Server running on http://localhost:${PORT}`);
//     console.log('='.repeat(40));
//     console.log('Available Endpoints:');
//     console.log('='.repeat(40));
//     console.log(`POST   /user              - Add user`);
//     console.log(`GET    /user              - Get all users`);
//     console.log(`GET    /user/:id          - Get user by ID`);
//     console.log(`GET    /user/getByName    - Search by name`);
//     console.log(`PATCH  /user/:id          - Update user`);
//     console.log(`DELETE /user/:id          - Delete user`);
//     console.log(`GET    /users             - Get all (with count)`);
//     console.log('='.repeat(40));
// });





 // Q6
// const express = require('express');
// const fs = require('fs').promises;
// const app = express();
// const PORT = 3000;
// const USERS_FILE = 'users.json';
// app.use(express.json());
// async function initializeUsersFile() {
//     try {
//         await fs.access(USERS_FILE);
//         console.log('users.json file exists');
//     } catch (error) {
//         await fs.writeFile(USERS_FILE, JSON.stringify([]));
//         console.log('Created users.json file');
//     }
// }
// async function readUsers() {
//     try {
//         const usersData = await fs.readFile(USERS_FILE, 'utf8');
//         return JSON.parse(usersData);
//     } catch (error) {
//         console.error('Error reading file:', error);
//         return [];
//     }
// }
// async function writeUsers(users) {
//     try {
//         await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
//         return true;
//     } catch (error) {
//         console.error('Error writing file:', error);
//         return false;
//     }
// }
// app.post('/user', async (req, res) => {
//     try {
//         const { name, age, email } = req.body;
//         if (!name || !age || !email) {
//             return res.status(400).json({ 
//                 message: 'Please provide name, age, and email.' 
//             });
//         }
//         const users = await readUsers();
//         const emailExists = users.some(user => user.email === email);
//         if (emailExists) {
//             return res.status(400).json({ 
//                 message: 'Email already exists.' 
//             });
//         }
//         const newUser = {
//             id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
//             name,
//             age,
//             email
//         };
//         users.push(newUser);
//         await writeUsers(users);
//         res.status(201).json({ 
//             message: 'User added successfully.' 
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.patch('/user/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id);
//         const updates = req.body;
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Invalid user ID.' 
//             });
//         }
//         if (!updates || Object.keys(updates).length === 0) {
//             return res.status(400).json({ 
//                 message: 'No update data provided.' 
//             });
//         }
//         const allowedUpdates = ['name', 'age', 'email'];
//         const invalidFields = Object.keys(updates).filter(
//             field => !allowedUpdates.includes(field)
//         );
//         if (invalidFields.length > 0) {
//             return res.status(400).json({ 
//                 message: `Invalid field(s): ${invalidFields.join(', ')}` 
//             });
//         }
//         const users = await readUsers();
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).json({ 
//                 message: 'User ID not found.' 
//             });
//         }
//         if (updates.email && updates.email !== users[userIndex].email) {
//             const emailExists = users.some(
//                 user => user.email === updates.email && user.id !== userId
//             );
//             if (emailExists) {
//                 return res.status(400).json({ 
//                     message: 'Email already exists.' 
//                 });
//             }
//         }
//         users[userIndex] = { ...users[userIndex], ...updates };
//         await writeUsers(users);
//         let message = 'User updated successfully.';
//         const updatedFields = Object.keys(updates);
//         if (updatedFields.length === 1) {
//             message = `User ${updatedFields[0]} updated successfully.`;
//         }
//         res.json({ message: message });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.delete('/user/:id', async (req, res) => {
//     try {
//         let userId = parseInt(req.params.id);
//         if (isNaN(userId)) {
//             userId = parseInt(req.body.id);
//         }
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Please provide a valid user ID.' 
//             });
//         }
//         const users = await readUsers();
//         const userIndex = users.findIndex(user => user.id === userId);
//         if (userIndex === -1) {
//             return res.status(404).json({ 
//                 message: 'User ID not found.' 
//             });
//         }
//         users.splice(userIndex, 1);
//         await writeUsers(users);
//         res.json({ 
//             message: 'User deleted successfully.' 
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/user/getByName', async (req, res) => {
//     try {
//         const userName = req.query.name;
//         if (!userName || userName.trim() === '') {
//             return res.status(400).json({ 
//                 message: 'Please provide a name parameter.' 
//             });
//         }
//         const users = await readUsers();
//         const foundUsers = users.filter(user => 
//             user.name.toLowerCase().includes(userName.toLowerCase())
//         );
//         if (foundUsers.length === 0) {
//             return res.status(404).json({ 
//                 message: 'User name not found.' 
//             });
//         }
//         const exactMatch = users.find(user => 
//             user.name.toLowerCase() === userName.toLowerCase()
//         );
//         if (exactMatch) {
//             res.json(exactMatch);
//         } else if (foundUsers.length === 1) {
//             res.json(foundUsers[0]);
//         } else {
//             res.json(foundUsers);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/user', async (req, res) => {
//     try {
//         const users = await readUsers();
//         res.json(users);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/user/filter', async (req, res) => {
//     try {
//         const minAge = parseInt(req.query.minAge);
//         if (isNaN(minAge)) {
//             return res.status(400).json({ 
//                 message: 'Please provide a valid minAge parameter. Example: /user/filter?minAge=25' 
//             });
//         }
//         if (minAge < 0) {
//             return res.status(400).json({ 
//                 message: 'minAge must be 0 or greater.' 
//             });
//         }
//         const users = await readUsers();
//         const filteredUsers = users.filter(user => user.age >= minAge);
//         if (filteredUsers.length === 0) {
//             return res.status(404).json({ 
//                 message: 'no_user_found'  
//             });
//         }
//         res.json(filteredUsers);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ 
//             message: 'Internal server error.' 
//         });
//     }
// });
// app.get('/users', async (req, res) => {
//     try {
//         const users = await readUsers();
//         res.json({
//             count: users.length,
//             users: users
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             message: 'Error reading users.' 
//         });
//     }
// });
// app.get('/user/:id', async (req, res) => {
//     try {
//         const userId = parseInt(req.params.id);
//         if (isNaN(userId)) {
//             return res.status(400).json({ 
//                 message: 'Invalid user ID.' 
//             });
//         }
//         const users = await readUsers();
//         const user = users.find(u => u.id === userId);
//         if (!user) {
//             return res.status(404).json({ 
//                 message: 'User not found.' 
//             });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ 
//             message: 'Error reading user.' 
//         });
//     }
// });
// app.get('/', (req, res) => {
//     res.json({
//         message: 'User Management API',
//         endpoints: {
//             'POST /user': 'Add new user',
//             'GET /user': 'Get all users',
//             'GET /user/:id': 'Get user by ID',
//             'GET /user/getByName?name=...': 'Search user by name',
//             'GET /user/filter?minAge=...': 'Filter users by minimum age',
//             'PATCH /user/:id': 'Update user',
//             'DELETE /user/:id': 'Delete user',
//             'GET /users': 'Get all users (with count)'
//         }
//     });
// });
// app.listen(PORT, async () => {
//     await initializeUsersFile();
//     console.log(`✅ Server running on http://localhost:${PORT}`);
//     console.log('='.repeat(50));
//     console.log('Available Endpoints:');
//     console.log('='.repeat(50));
//     console.log(`POST   /user                - Add user`);
//     console.log(`GET    /user                - Get all users`);
//     console.log(`GET    /user/:id            - Get user by ID`);
//     console.log(`GET    /user/getByName      - Search by name`);
//     console.log(`GET    /user/filter?minAge=X- Filter by minimum age`);
//     console.log(`PATCH  /user/:id            - Update user`);
//     console.log(`DELETE /user/:id            - Delete user`);
//     console.log(`GET    /users               - Get all (with count)`);
//     console.log('='.repeat(50));
// });





// Q7
const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;
const USERS_FILE = 'users.json';
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});
app.use(express.json());
async function initializeUsersFile() {
    try {
        await fs.access(USERS_FILE);
        console.log('✅ users.json file exists');
    } catch (error) {
        await fs.writeFile(USERS_FILE, JSON.stringify([]));
        console.log('✅ Created users.json file');
    }
}
async function readUsers() {
    try {
        const usersData = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(usersData);
    } catch (error) {
        console.error('❌ Error reading file:', error);
        return [];
    }
}
async function writeUsers(users) {
    try {
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error('❌ Error writing file:', error);
        return false;
    }
}
app.post('/user', async (req, res) => {
    try {
        const { name, age, email } = req.body;
        if (!name || !age || !email) {
            return res.status(400).json({ 
                message: 'Please provide name, age, and email.' 
            });
        }
        const users = await readUsers();
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            return res.status(400).json({ 
                message: 'Email already exists.' 
            });
        }
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            age,
            email
        };
        users.push(newUser);
        await writeUsers(users);
        res.status(201).json({ 
            message: 'User added successfully.' 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Internal server error.' 
        });
    }
});
app.patch('/user/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const updates = req.body;
        if (isNaN(userId)) {
            return res.status(400).json({ 
                message: 'Invalid user ID.' 
            });
        }
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ 
                message: 'No update data provided.' 
            });
        }
        const allowedUpdates = ['name', 'age', 'email'];
        const invalidFields = Object.keys(updates).filter(
            field => !allowedUpdates.includes(field)
        );
        if (invalidFields.length > 0) {
            return res.status(400).json({ 
                message: `Invalid field(s): ${invalidFields.join(', ')}` 
            });
        }
        const users = await readUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ 
                message: 'User ID not found.' 
            });
        }
        if (updates.email && updates.email !== users[userIndex].email) {
            const emailExists = users.some(
                user => user.email === updates.email && user.id !== userId
            );
            if (emailExists) {
                return res.status(400).json({ 
                    message: 'Email already exists.' 
                });
            }
        }
        users[userIndex] = { ...users[userIndex], ...updates };
        await writeUsers(users);
        let message = 'User updated successfully.';
        const updatedFields = Object.keys(updates);
        
        if (updatedFields.length === 1) {
            message = `User ${updatedFields[0]} updated successfully.`;
        }
        res.json({ message: message });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Internal server error.' 
        });
    }
});
app.delete('/user/:id', async (req, res) => {
    try {
        let userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            userId = parseInt(req.body.id);
        }
        if (isNaN(userId)) {
            return res.status(400).json({ 
                message: 'Please provide a valid user ID.' 
            });
        }
        const users = await readUsers();
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ 
                message: 'User ID not found.' 
            });
        }
        users.splice(userIndex, 1);
        await writeUsers(users);
        res.json({ 
            message: 'User deleted successfully.' 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Internal server error.' 
        });
    }
});
app.get('/user/getByName', async (req, res) => {
    try {
        const userName = req.query.name;
        if (!userName || userName.trim() === '') {
            return res.status(400).json({ 
                message: 'Please provide a name parameter.' 
            });
        }
        const users = await readUsers();
        const foundUsers = users.filter(user => 
            user.name.toLowerCase().includes(userName.toLowerCase())
        );
        if (foundUsers.length === 0) {
            return res.status(404).json({ 
                message: 'User name not found.' 
            });
        }
        const exactMatch = users.find(user => 
            user.name.toLowerCase() === userName.toLowerCase()
        );
        if (exactMatch) {
            res.json(exactMatch);
        } else if (foundUsers.length === 1) {
            res.json(foundUsers[0]);
        } else {
            res.json(foundUsers);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Internal server error.' 
        });
    }
});
app.get('/user', async (req, res) => {
    try {
        const users = await readUsers();
        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Internal server error.' 
        });
    }
});
app.get('/user/filter', async (req, res) => {
    try {
        const minAge = parseInt(req.query.minAge);
        if (isNaN(minAge)) {
            return res.status(400).json({ 
                message: 'Please provide a valid minAge parameter.' 
            });
        }
        if (minAge < 0) {
            return res.status(400).json({ 
                message: 'minAge must be 0 or greater.' 
            });
        }
        const users = await readUsers();
        const filteredUsers = users.filter(user => user.age >= minAge);
        if (filteredUsers.length === 0) {
            return res.status(404).json({ 
                message: 'no_user_found'
            });
        }
        res.json(filteredUsers);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Internal server error.' 
        });
    }
});
app.get('/user/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (isNaN(userId)) {
            return res.status(400).json({ 
                message: 'Invalid user ID.' 
            });
        }
        const users = await readUsers();
        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found.' 
            });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error reading user.' 
        });
    }
});
app.get('/', (req, res) => {
    res.json({
        message: 'User Management API - All 7 Endpoints Working',
        endpoints: [
            '1. POST /user - Add new user',
            '2. PATCH /user/:id - Update user',
            '3. DELETE /user/:id - Delete user',
            '4. GET /user/getByName?name=... - Search by name',
            '5. GET /user - Get all users',
            '6. GET /user/filter?minAge=... - Filter by minimum age',
            '7. GET /user/:id - Get user by ID'
        ],
        note: 'All data is stored in users.json file'
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: `The route ${req.method} ${req.url} does not exist`,
        availableEndpoints: [
            '/user',
            '/user/:id',
            '/user/getByName',
            '/user/filter'
        ]
    });
});
app.listen(PORT, async () => {
    await initializeUsersFile();
    console.log('='.repeat(60));
    console.log('🚀 Server running on http://localhost:' + PORT);
    console.log('='.repeat(60));
    console.log('📌 All responses will be JSON, not HTML');
    console.log('='.repeat(60));
    console.log('✅ Go to browser or Postman and try:');
    console.log('   http://localhost:' + PORT + '/');
    console.log('='.repeat(60));
});