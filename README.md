# What is this?

This is a boilerplate for getting started really fast developing applications for Zendesk Support.
There are few boilerplates out there, that tend to do the same, but I did not find them fitting my needs, mostly because some of them are bloated (with unnecessary dependencies), not well organised, using old technology, slow or just don't do enough.
This boilerplate provides few things out of the box, so you can get started developing your next app in no time:

1. **Use any front-end framework you like.** Really, pick your poison and go ahead.
   This boilerplate made a choice of a bundler / compiler instead of framework. The choice here is modern and blazingly fast [Vite](https://vitejs.dev/).
2. **Hot reload during development**.
   With all the current boilerplates out there, you can only get your builds recompile but you still have to use your mouse to click "Refresh" icon in the browser. This is not the case any more, it's a real instant (thanks to Vite) HMR - make your change, save the file, see the result.
3. **It is blazingly fast.**
   Thanks to Vite under the hood, all of the frameworks are transpiled really fast, you have almost instant server start and build times.
4. **Minimal dependencies list, just to get you started**.
   I specifically opted in for some features and not the others (testing, for example). It is up to you to make the choice, but the point below will allow to do so easily.
5. **Well organised file / folder structure that is very extendible**.
   Boilerplate is structured in a way that you can extend all the current compiling scripts, control the destination output etc etc. You are the boss.
6. **Use different frameworks for different application location.**
   You might know, that Zendesk Support API supports different [app locations](https://developer.zendesk.com/api-reference/apps/apps-support-api/all_locations/). You are free to use different frameworks for different applications, as long as it compiles to good'ol JavaScript.

# Get started

1. Clone the repository

```
git clone git@github.com:OlegGulevskyy/zendesk-vite-boilerplate.git
```

2. Install `zcli` [npm package](https://www.npmjs.com/package/@zendesk/zcli) globally on your PC, that is distributed by Zendesk.

```
yarn global add @zendesk/zcli
```

or

```
npm install -g @zendesk/zcli
```

3. Install boilerplate packages inside cloned repository

```
cd zendesk-vite-boilerplate
yarn
```

or

```
cd zendesk-vite-boilerplate
npm install
```

## Local development

1. Inside your boilerplate cloned directory use scripts from `package.json` to start `zcli` server. It will build all required Zendesk files, including `manifest.json`

```
yarn zcli:start
```

2. At this point you can start a server using any framework that you might have created before, or have in your `packages` directory.

```
yarn ticket_sidebar:start
```

!! Use any other application names instead of `ticket_sidebar` !!
By default this will execute `yarn dev` script in `ticket_sidebar` folder, where your framework rests.

## Build for production

1. Inside your project directory use build script from `package.json` file

```
yarn build
```

2. If all is successfull, you can package the application into a tmp file provided using zcli

```
yarn zcli:package
```

3. The packaged application is inside your `/dist`. Exact path is `/dist/tmp`.

# Create new application

One of the main, what I consider to be coolest features, of this boilerplate - is the ability to create an a Zendesk application with any framework (even vanilla js).
Zendesk Support supports multiple different locations for which you can have a separate application. Here is all of them [via link](https://developer.zendesk.com/api-reference/apps/apps-support-api/all_locations/) (check items under `APPS SUPPORT API` sidebar) and listed below:

1. Ticket sidebar (package name should be `ticket_sidebar`) - already in the boilerplate by default
2. New ticket sidebar (package name should be `new_ticket_sidebar`)
3. Organization sidebar (package name should be `organization_sidebar`)
4. User sidebar (package name should be `user_sidebar`)
5. Top bar (package name should be `top_bar`) - already in the boilerplate by default
6. Nav bar (package name should be `nav_bar`)
7. Modal (package name should be `modal`)
8. Ticket editor (package name should be `ticket_editor`)
9. Background (package name should be `background`)

Let's create a new `top_bar` application, that will use `Vue` js.

1. Navigate into `/packages` folder and create a regular project of a chosen framework.

```
cd packages
yarn vite create
```

- Where you can choose any framework of your liking, but for the sake of the example we agreed to go with Vue.
- When prompted, provide a project name `top_bar`.
  **!! Important !!** <br> Make sure the project name is what you intended this application to be - if it's an application for New ticket sidebar - call it `new_ticket_sidebar`), if it's a Top bar application, call it `top_bar`. <br> Refer to the table above for a detailed list of supported names by Zendesk. The name of this will be used to correctly build `manifest.json` file.

2.  Navigate to your newly created vue project

```
cd top_bar
```

3. Let's install all packages required for it to run. (nothing special so far, a regular front-end project)
   `yarn` or `npm install`
4. Open your newly created `vite.config.ts` (or `vite.config.js` if you did not use TypeScript template), that is based in the folder `top_bar`.
5. Import a plugin prepared for you by this boilerplate, this plugin will be injecting ZAF client SDK url into the `index.html` file

```ts
import { injectZafHtmlPlugin } from "@app/zendesk/vite-plugin-inject-zaf-html";
```

6. Add this plugin into your `plugins` dependency array like so:

```ts
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), injectZafHtmlPlugin()],
});
```

7. Next, inside the same file `vite.config.*` update the destination folder where the project will be built to, by adding properties `base` and `build` like so

```ts
// https://vitejs.dev/config/
  plugins: [react(), injectZafHtmlPlugin()],
  base: "./",
  build: {
    outDir: `${process.env.INIT_CWD}/dist/assets/${process.env.ADDON_TYPE}`,
    emptyOutDir: true
  },
});
```

8. Next, open `package.json` file inside boilerplate folder, **NOT** inside the new `top_bar` folder, but the main project directory and add `top_bar` into 2 scripts:

- `zcli:start` like so - `node scripts/build.mjs local top_bar && zcli apps:server dist`
- `build` like so - `node scripts/build.mjs prod top_bar`
- Optionally, create a new script for convenience to spin up the Vite server with Vue faster- `top_bar:start`, and set it's command to - `node scripts/run.mjs top_bar`

9. That's it, you are ready to run / build your project.
   In boilerplate project folder run those scripts in separate terminals
   `yarn zcli:start` and `yarn top_bar:start` (if you have not created the script `top_bar:start`, you can manually navigate into a `top_bar` folder and start the server from there `yarn dev`

# Structure

`scripts` - logic responsible for executing building scripts / running local server <br>
`packages` - applications and Zendesk related source files <br>
&nbsp; &nbsp; ⮑ `zendesk` - includes everything related to what Zendesk expects you to provide <br>
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `sdk` - reusable ZAF client that you will use to interact with ZAF APIs <br>
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `scripts` - logic responsible for building Zendesk related files, such as `manifest.json` <br>
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `vite-plugin-inject-zaf-html` - Vite plugin for injecting automatically ZAF CDN script <br>
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `translations` - will be simply copied to `/dist` folder <br>
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `assets` - logos and things, that Zendesk expects every app to have <br>
&nbsp; &nbsp; ⮑ `ticket_sidebar` - Boilerplate of an application for ticket sidebar using React <br>
`ticket_sidebar` is an example, it does not have to be included in your application. List of allowed applications is [here](https://developer.zendesk.com/api-reference/apps/apps-support-api/all_locations/), as well as in the comment of script [here](https://github.com/OlegGulevskyy/zendesk-vite-boilerplate/blob/02b74dd1f87dcb1f2249f534425c5813d740d993/scripts/build.mjs#L20) .

## Roadmap

- [ ] Example of CI/CD using zcli
- [ ] Some more examples using different frameworks

Let me know if you think there is should be something else.

## Issues / Contribution

If you do have an issue / question / problem - do not hesitate to raise an issue.
I am planning to update this repository more I use and create Zendesk apps. I am using it for my own needs to start faster on some of the freelance projects.
If you feel like you need further help or my services in developing Zendesk application - feel free to shot an email - oleggulevskyy@gmail.com
