# Image Gallery for React.js using Node.js API

This gallery has been developed using [create-react-app-ts](https://github.com/wmonk/create-react-app-typescript) along with sass for the frontend.

The backend API is using a basic Express.js structure for the API.

## How to install

In order to install this example app, you need to install all the dependencies of the project

```
npm install
```

The testing setup is currently using mocha for the Backend tests. It needs to be installed globally:

```
npm install -g mocha
```

To run the tests simply execute:

```
npm run server:test
```

Currently, there is only one test as this is only an example.

In order to start the app:

```
npm run build
npm run server
```

If we don't want to re-run the server every time we change something on the front code, we need to run the build command in watch mode:

```
npm run build:watch
```

And in another process start the server:

```
npm run server
```

This will open the port 8080, so the website will be available through [http://localhost:8080]

## Development

In order to develop this image gallery example, I have used the create-react-app setup along with typescript and sass. 

Typescript is a very powerful tool that gives the developer some features that makes development a lot easier.
This project also uses sass. There is a _settings.scss file in the root style forder with some configuration.

This is a Server Side Rendered React application. All the requests will go through the node.js web server and then will be processed by the React router in the client if the don't match any route in the server.

All the images are lazy loaded, so they are only requested on demand if they are to be displayed. When the server requests the images to the FlickrAPI, it also requests some sizes of the image. The frontend then, uses these sizes (thumbnail, medium, original) depending on when the image is being visualized.

For the gallery, the thumbnail is used initialy with a blur filter in order to give some feedback to the user even if we don't have the image yet. When the image is loaded, this blur filter in the thumbnail disappears.

When the user clicks one of the images, the lightbox is opened with the original size image. It also loads 3 more images from the left and from the right in order to have it ready before the user starts navigating.

The gallery is responsive. Each image is set to be displayed at 350px aprox, so there will be as many columns of this width as it is possible depending on the window size.

Last but not least, this is an infinite scrolling gallery. Once the user reaches the bottom of the page (or maybe a little bit before), the next set (page) of images are rendered for that search.


