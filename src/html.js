
const Html = `<!doctype html>
<html>
  <head>
    <link async rel="stylesheet" href="dist/css/ionicons.min.css">
    <style>

    .focusarea, .brusharea {
    fill: steelblue;
    clip-path: url(#clip);
    }

    .zoom {
    cursor: move;
    fill: none;
    pointer-events: all;
    }


    </style>
  </head>
  <body>
      <div id="root"></div>
      <script src="dist/bundle.js"></script>
  </body>
</html>
`


export default Html
