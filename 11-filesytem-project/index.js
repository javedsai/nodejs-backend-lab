import express from "express";
import fs from "fs";
const app = express();

//common middleware only for practise purpose. For this project not reqd
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Routes

//write File
app.get('/write-file', (req, res) => {
    fs.writeFile('./public/output1.txt', 'This is a test message', (err) => {
        if (err) {
            return res.status(500).status('Failed to write File');
        }
        return res.send('File written successfully');
    });
});

app.get('/read-file', (req, res) => {
    fs.readFile('./public/output.txt', (err, data) => {
        if (err) {
            return res.status(500).send('File not found');
        }
        // console.log(data)
        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    });
});

app.get('/append-file', (req, res) => {
    fs.appendFile('./public/new-output.txt', '\n Second line', (err) => {
        if (err) {
            return res.status(500).send('Failed to append file');
        }
    });
    return res.send('File appended successfully');
});

app.get('/delete-file', (req, res) => {
    fs.unlink('./public/output.txt', (err) => {
        if (err) {
            return res.status(500).send('Failed to delete file');
        }
    });
    res.send('File deleted successfully');
});

app.get('/read-folder', (req, res) => {
    fs.readdir('./public', (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        // console.log(file);
        files.forEach((file) => {
            console.log(file);
        });
    });
});

app.get('/rename-file', (req, res) => {
    fs.rename('./public/output.txt', './public/new-output.txt', (err) => {
        if (err) {
            return res.status(500).send('Failed to rename file');
        }
        res.send('File renamed successfully');
    });
});

app.get('/stream-text', (req, res) => {
    const fileStream = fs.createReadStream('./public/new-output.txt');
    fileStream.on('open', () => {
        fileStream.pipe(res);
    });
    fileStream.on('error', (err) => {
        res.status(500).send('File not found / Error reading file');
    });
});

//create folder
app.get('/create-folder', (req, res) => {
    fs.mkdir('./public/my-folder', (err) => {
        if (err) {
            return res.status(500).send('Error creating folder');
        }
        res.send('Folder created successfully');
    });
});

//rename folder
app.get('/rename-folder', (req, res) => {
    fs.rename('./public/my-folder', './public/rename-folder', (err) => {
        if (err) {
            return res.status(500).send('Error in renaming folder');
        }
        res.send('Folder renamed successfully');
    })

});

//delete folder
app.get('/delete-folder', (req, res) => {
    fs.rmdir('./public/rename-folder', (err) => {
        if (err) {
            return res.status(500).send('Error deleting folder');
        }
        res.send('Folder deleted successfully');
    });
});

//read pdf
app.get('/read-pdf', (req, res) => {
    fs.readFile('./public/resume.pdf', (err, data) => {
        if (err) {
            return res.status(500).status("PDF file not found");
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.send(data);
    });
});

//read json
app.get('/read-json', (req, res) => {
    fs.readFile('./public/data.json', (err, data) => {
        if (err) {
            return res.status(500).send('Json file not found');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

//write json
app.get('/write-json', (req, res) => {
    const filePath = './public/data.json';
    const data = {
        'name': 'Amjad Khan',
        'email': 'amjad@test.com',
        'age': 36
    };

    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            return res.status(500).send('Failed to write JSON file');
        }
        res.send('Json file written successfully');
    });
});

//append json file
app.get('/append-json', (req, res) => {
    const filePath = './public/data.json';
    const newData = {
        "name": "Salman Khan",
        "email": "salman@test.com",
        "age": 50
    };
    
    fs.readFile('./public/data.json', (err, data) => {
        if (err) {
            return res.status(500).send('Json file not found');
        }
        // res.setHeader('Content-Type', 'application/json');
        console.log("Before Parse", typeof data);
        let jsonData = JSON.parse(data);
        console.log("After Parse", typeof jsonData);
        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }
        jsonData.push(newData);
        fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
            if (err) {
                return res.status(500).send('Failed to append JSON file');
            }
            res.send('JSON file appended successfully');
        })
    })

});

//read image
app.get('/read-image', (req, res) => {
    fs.readFile('./public/img2.jpg', (err, data) => {
        if (err) {
            return res.status(500).send('Image not found');
        }
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(data);
    });
});

//read video
app.get('/read-video', (req, res) => {
    fs.readFile('./public/WIN_20170626_10_16_01_Pro.mp4', (err, data) => {
        if (err) {
            return res.status(500).send('Video not found');
        }
        res.setHeader('Content-Type', 'video/mp4');
        res.send(data);
    });
});

//check file info
app.get('/file-info', (req, res) => {
    fs.stat('./public/WIN_20170626_10_16_01_Pro.mp4', (err, stats) => {
        if (err) {
            return res.status(500).send('File not found');
        }
        // res.send(stats);
        console.log('Is file: ' + stats.isFile());
        console.log('Is folder: ' + stats.isDirectory());
        res.send(stats.size + ' bytes');
    });
});

app.get('/file-exist', (req, res) => {
    fs.access('./public/WIN_20170626_10_16_01_Pro.mp4', (err) => {
        if (err) {
            return res.status(500).send('File not found');
        }
        res.send('File exist');
    });
});

app.listen(3000, () => {
    console.log("Server is running at Port 3000");
});