import { Express, Request, Response } from 'express';
import { getBookHandler } from './books/books.controller';

async function throwError() {
  throw new Error('Boom!');
}

function routes(app: Express) {
  // app.get('/', (req: Request, res: Response) => {
  //   // will end the response process
  //   // return res.end();
  //   // will send a json response
  //   // return res.json({
  //   //   success: true,
  //   //   name: 'Meee',
  //   // });
  //   // will send a json with jsonp support
  //   // return res.jsonp();
  //   // will send a redirect request
  //   // return res.redirect('http://example.com');
  //   // will render a view template
  //   // return res.render();
  //   // will send a response of various types
  //   // return res.send('Hello World!');
  //   // will send a file as an octet stream
  //   // return res.sendFile();
  //   // will send a status code
  //   // return res.sendStatus(200);
  // });

  // Route paths can be either
  // - A string
  app.get('/', (req: Request, res: Response) => {
    return res.status(200).send('Check helmet headers');
  });

  // Route paths can be either
  // - A string
  app.get('/health', (req: Request, res: Response) => {
    return res.status(200).send('You healthy son!');
  });

  // - A string pattern
  app.get('/ab*cd', (req: Request, res: Response) => {
    return res.send('/ab*cd');
  });

  // - A regular expression
  app.get(/wxyz/, (req: Request, res: Response) => {
    return res.send('wxyz');
  });

  app
    .route('/api/books')
    // Get a list of books
    .get((req: Request, res: Response) => {
      return res.send('You made a GET request');
    })
    // Create a book
    .post((req: Request, res: Response) => {
      return res.send('You made a POST request');
    })
    // Update a book
    .put((req: Request, res: Response) => {
      return res.send('You made a PUT request');
    })
    // Delete a book
    .delete((req: Request, res: Response) => {
      return res.send('You made a DELETE request');
    })
    // Catch all
    .all((req: Request, res: Response) => {
      return res.send('You made a X request');
    });

  app.get('/api/books/:bookId/:authorId', getBookHandler);

  // Route Parameters with route middleware
  // app.get('/api/books/:bookId/:authorId', middleware, handleGetBook);

  app.post('/api/data', (req: Request, res: Response) => {
    console.log(req.body);

    return res.sendStatus(200);
  });

  // Listens to all http methods
  app.all('/api/all', (req: Request, res: Response) => {
    return res.status(200).send('Any http method');
  });

  app.get('/error', async (req: Request, res: Response) => {
    try {
      await throwError();
      res.status(200);
    } catch (e) {
      res.status(400).send('Something bad happened');
    }
  });
}

export default routes;
