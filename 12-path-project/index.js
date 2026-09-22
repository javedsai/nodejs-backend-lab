import express from "express";
import path from "path";
const app = express();
const __dirname = import.meta.dirname;

//Common Middleware - For this project not reqd, just for practise
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//Routes
app.get('/', (req, res) => {
    const filePath = '/Users/YahooBaba/Docs/report.pdf';
    console.log('Base Name :', path.basename(filePath));
    console.log('Directory :', path.dirname(filePath));
    console.log('Extension :', path.extname(filePath));
    const parse = path.parse(filePath);
    console.log(parse);
    console.log('Ext: ', parse.ext);

    //create a path
    const fullPath = path.join(__dirname, 'public', 'images', 'avatar.jpg');
    console.log('Full Path: ', fullPath);
    //absolute path
    const absolutePath = path.resolve('public', 'images', 'avatar.jpg');
    console.log('Absolute Path: ',absolutePath);
    //relative path
    const relativePath = path.join('public', 'images', 'avatar.jpg');
    console.log('Relative Path: ', relativePath);

    res.send('Path Module');
});

app.listen(3000, () => console.log("Server is running at port 3000"));

