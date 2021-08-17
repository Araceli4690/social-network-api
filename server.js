const { Mongoose } = require('mongoose');

app.use(express.json());
app.use(express.urlencoded());


app.use(require('./routes'));

Mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//log mongo queries
Mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost: ${PORT}`));