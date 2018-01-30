const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// Static (Public) folder set-up
app.use(express.static(`${__dirname}/public`));


//Body parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(3000, () => console.log('o hai port 3000'));

app.get('/', (req,res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const output = `
    <h1>O HAI</h1>
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Type: ${req.body.typeofevent}</li>
    <li>Date: ${req.body.date}</li>
    <li>E-mail: ${req.body.email}</li>
    <li>Phone Number: ${req.body.phonenumber}</li>
    <li>Other Info: ${req.body.otherinfo}</li>
    </ul>`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'MY@EMAIL.COM',
      pass: 'MYPASS'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: '"KatyCresner.com Contact" <nickcresner@gmail.com>',
    to: 'a.i.cwiek@gmail.com',
    subject: 'Hello ✔',
    html: output
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return console.log(error);
    }
    // res.render('index');
  });
});
