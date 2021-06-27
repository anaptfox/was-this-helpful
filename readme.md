![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Was This Helpful?

`was-this-helpful` is a [Stencil.js](http://stenciljs.com) [web component](https://www.webcomponents.org/) that gives you a simple "Was this helpful?" form.  It also allows you [send the data any where you want](#handling-events) ✨. 

[See Demo](https://stackblitz.com/edit/was-this-helpful-example?devtoolsheight=33&file=index.html)

## Features

- Easily ask a 👍 or 👎 question.
- Send the event data where ever you want. For example, you can send to your own endpoint, Heap.io, Google Analytics, etc.

## Quickstart

```html
<!-- Load the snippet. -->
<script src='<script type="module"src='https://unpkg.com/was-this-helpful@0.0.1/dist/was-this-helpful/was-this-helpful.esm.js'></script>'></script>

<!-- Place the component where you want it. -->
<was-this-helpful></was-this-helpful>

<script>
  const wasThisHelpful = document.querySelector('was-this-helpful');
  
  wasThisHelpful.addEventListener('everything', event => {
    
    console.log("An event was triggered:")
    console.log(JSON.stringify(event.detail, undefined, 2));
    console.log('Now, in JS, you can send the event where ever you want. 🤘')

  });
</script>
```

## Events

The component fires the following events:

- `response` - when the user selects 👍 or 👎.
- `feedback` - when the user selects a feedback radio input.
- `additional-feedback` - when the users submits custom feedback text.
- `everything`- when any of the following events above are triggered.

Each event will be triggered separately. You can associate them with the [`session`](#api) property.

### Event Data

Here is the format of the event data:

```jsx
{
  "time": 1624817229990,
  "session": "ae678693-fa67-473e-86d6-e7d62cca72b8",
  "event": "response",
  "data": "thumbs-up",
  "location": {
    "href": "http://localhost:3333/",
    "path": "/",
    "hostname": "localhost"
  }
}
```

### Handling Events

```jsx
<script>
  const wasThisHelpful = document.querySelector('was-this-helpful');
  wasThisHelpful.addEventListener('everything', event => {
    console.log("An event was triggered:")
    console.log(JSON.stringify(event.detail, undefined, 2));

    console.log('Now, in JS, you can send the event where ever you want. 🤘')
  });
</script>
```

## Feedback Styles

The component can capture feedback in different ways. It can be controlled with an attribute called `feedback-style`.

- `none` (default) - This style is just the response. That's it. 
- `options` (recommended) - After the user response, they will be presented radio options for additional input.
- `form` - After the user response, they will be presented with a text area for additional input.
- `other` - After the user response, they will be presented radio options for additional input with an additional option "Other". If the user selects other, they will be presented with a text area to provide more information.
- `options` is recommended because it's less work for the user and still provides you more "why" information. They can select response, and option, and that's it. 

## Installation

There are three strategies for using this components:

### **Script tag**

Place the following script tag  in the head of your `index.html`:

```html
<script src='<script type="module"src='https://unpkg.com/was-this-helpful@0.0.1/dist/was-this-helpful/was-this-helpful.esm.js'></script>'></script>
```

Then you can use the element anywhere in your template, JSX, html etc

### **Node Modules**

1. Run the following command using NPM or Yarn:

```html
npm install was-this-helpful --save
```

2. Place a script tag in the head of your index.html

```html
<script src='node_modules/was-this-helpful/dist/was-this-helpfu.esm.js'></script>
```

### **In a app, MDX, etc.**

1. Run the following command using NPM or Yarn:

```html
npm install was-this-helpful --save
```

2. Add an import:

```html
import was-this-helpful;
```

After doing one of these,  you can use the element anywhere in your template, JSX, html etc

## API

The component exposes the following options:

- `question` - `string` - change the name of the main question. 
- `icon-style` - `string` - change icon style. The icons are from [Heroicons](https://heroicons.com/). Here are the options:  
  - `thumbs` (default)  
  - `emoji`  
- `feedback-style` - `string` - update the [Feedback Style](). Here are the options:  
  - `none` (default)  
  - `options`  
  - `form`  
  - `other`  
- `feedback-question` - `string` - change the name of the feedback question.  
- `done-text` - update the text the user sees when done giving feedback.  
- `session` - label the user's session.  
- `feedback-style` - change how the component gets feedback.    
- `happy-feedback` - if using `options` or `other`, you can provide a comma delineated list of options if the user submits *positive* feedback.   
    ex. `'Easy to understand, Solved my problem'`  
- `sad-feedback` - if using `options` or `other`, you can provide a comma delineated list of options if the user submits *negative* feedback.   
    ex. `'Hard to understand, Incorrect information or sample code, Missing the information/samples I need'`  

Example:

```jsx
<was-this-helpful 
  question="Am I awesome?"
  icon-style="emoji"
  feedback-question="Do you have anything left to say?"
  done-text="Have a beautiful day!"
></was-this-helpful>
```

## Styling

When styling the component, here are the following CSS Variables you can set:

- `--was-this-helpful-main-color` 
- `--was-this-helpful-font-family`

Example with Dark Mode 🕶️:

```jsx
<style>
  body {
    background-color: black;
  }

  was-this-helpful {
    --was-this-helpful-main-color: #D1D5DB;
    --was-this-helpful-font-family: 'Inter', sans-serif;
  }

  @media screen and (prefers-color-scheme: light) {
    body {
      background-color: white;
    }

    was-this-helpful {
      --was-this-helpful-main-color: #4338CA;
    }
  }

</style>
```

## Future Things:

- [x]  Thumbs and Emojis
- [x]  Dark Mode
- [ ]  Usage in React, Vue
- [ ]  Build more Examples
    - [ ]  Google Analytics
    - [ ]  MixPanel
    - [ ]  Meroxa
- [ ]  Testing 🙃
- [ ]  Browser Testing
- [ ]  The user can customize icons
- [ ]  Different Styles
    - [ ]  In line: Was the helpful 👍  👎?