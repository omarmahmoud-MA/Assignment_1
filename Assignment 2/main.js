// // Q1
// function logFileInfo() {
//   console.log({
//     File: __filename,   
//     Dir: __dirname      
//   });
// }
// logFileInfo();





// // Q2
// const path = require('path');
// function getFileName(filePath) {
//   return path.basename(filePath); // returns only the file name
// }
// const filePath = "/user/files/report.pdf";
// console.log(getFileName(filePath)); 





// // Q3
// function buildPath(fileObj) {
//   return fileObj.dir + "/" + fileObj.name + fileObj.ext;
// }
// const fileObj = { dir: "/folder", name: "app", ext: ".js" };
// console.log(buildPath(fileObj)); 





// // Q4
// const path = require("path");
// function getFileExtension(filePath) {
//     return path.extname(filePath);
// }
// console.log(getFileExtension("/docs/readme.md"));





// // Q5
// const path = require("path");
// function parseFile(pathStr) {
//     const result = path.parse(pathStr);
//     return {
//         Name: result.name,
//         Ext: result.ext
//     };
// }
// console.log(parseFile("/home/app/main.js"));





// // Q6
// const path = require("path");
// function isAbsolutePath(filePath) {
//     return path.isAbsolute(filePath);
// }
// console.log(isAbsolutePath("/home/user/file.txt"));





// // Q7
// const path = require("path");
// function joinSegments(...segments) {
//     return path.join(...segments);
// }
// console.log(joinSegments("src", "components", "App.js"));





// // Q8
// const path = require("path");
// function resolvePath(relativePath) {
//     return path.resolve(relativePath);
// }
// console.log(resolvePath("./index.js"));





// // Q9
// const path = require("path");
// function joinPath(path1, path2) {
//     return path.join(path1, path2);
// }
// console.log(joinPath("/folder1", "folder2/file.txt"));





// // Q10
// const fs = require("fs");
// const path = require("path");
// function deleteFile(filePath) {
//     fs.unlink(filePath, (err) => {
//         if (err) {
//             console.log("Error:", err.message);
//         } else {
//             console.log(`The ${path.basename(filePath)} is deleted.`);
//         }
//     });
// }
// deleteFile("/path/to/file.txt");





// // Q11
// const fs = require("fs");
// function createFolderSync(folderPath) {
//     try {
//         fs.mkdirSync(folderPath);
//         console.log("Success");
//     } catch (err) {
//         if (err.code === "EEXIST") {
//             console.log("Folder already exists");
//         } else {
//             console.log("Error:", err.message);
//         }
//     }
// }
// createFolderSync("./myFolder");





// // Q12
// const EventEmitter = require("events");
// const emitter = new EventEmitter();
// emitter.on("start", () => {
//     console.log("Welcome event triggered!");
// });
// emitter.emit("start");





// // Q13
// const EventEmitter = require("events");
// const emitter = new EventEmitter();
// emitter.on("login", (username) => {
//     console.log(`User logged in: ${username}`);
// });
// emitter.emit("login", "Ahmed");





// // Q14
// const fs = require("fs");
// function readFileSyncExample(filePath) {
//     try {
//         const data = fs.readFileSync(filePath, "utf8"); // read file as text
//         console.log("The file content =>", data);
//     } catch (err) {
//         console.log("Error reading file:", err.message);
//     }
// }
// readFileSyncExample("./notes.txt");





// // Q15
// const fs = require("fs");
// function writeFileAsync(filePath, content) {
//     fs.writeFile(filePath, content, "utf8", (err) => {
//         if (err) {
//             console.log("Error writing file:", err.message);
//         } else {
//             console.log(`File saved successfully at ${filePath}`);
//         }
//     });
// }
// writeFileAsync("./async.txt", "Async save");





// // Q16
// const fs = require("fs");
// function isDirectory(path) {
//     try {
//         return fs.existsSync(path) && fs.statSync(path).isDirectory();
//     } catch (err) {
//         console.log("Error:", err.message);
//         return false;
//     }
// }
// console.log(isDirectory("./notes.txt")); 
// console.log(isDirectory("./myFolder"));  





// // Q17
// const os = require("os");
// function getOSInfo() {
//     return {
//         Platform: os.platform(),  
//         Arch: os.arch()         
//     };
// }
// console.log(getOSInfo());
