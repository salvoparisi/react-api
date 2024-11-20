const cors = require('cors');
const express = require('express')
const app = express()
const postController = require('./controllers/posts.js')
const notFoundMiddleware = require('./middlewares/notFoundMiddleware.js')
const loggerMiddleware = require('./middlewares/loggerMiddleware.js')
const PORT = 3000

app.use(cors())

app.use(express.json())

app.use('/', loggerMiddleware)
/*
app.use('/', (req, res, next) => {
    throw new Error("Hai spaccato tutto!");
  });
*/

app.get('/', postController.show)
app.post('/', postController.store)
app.put('/:id', postController.update)
app.delete('/:id', postController.destroy)

app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening http://localhost:${PORT}`);
})