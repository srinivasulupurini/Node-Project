module.exports = function(app,handlers){
app.get('/', handlers.home);
app.post('/upload', handlers.upload);
app.get('/:file(*)', handlers.download);
};