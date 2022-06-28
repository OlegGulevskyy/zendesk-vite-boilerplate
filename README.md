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

# Structure

`scripts` - logic responsible for executing building scripts / running local server
`packages` - applications and Zendesk related source files
&nbsp; &nbsp; ⮑ `zendesk` - includes everything related to what Zendesk expects you to provide
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `sdk` - reusable ZAF client that you will use to interact with ZAF APIs
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `scripts` - logic responsible for building Zendesk related files, such as `manifest.json`
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `vite-plugin-inject-zaf-html` - Vite plugin for injecting automatically ZAF CDN script
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `translations` - will be simply copied to `/dist` folder
&nbsp; &nbsp; &nbsp; &nbsp; ⮑ `assets` - logos and things, that Zendesk expects every app to have
&nbsp; &nbsp; ⮑ `ticket_sidebar` - Boilerplate of an application for ticket sidebar using React
`ticket_sidebar` is an example, it does not have to be included in your application. List of allowed applications is [here](https://developer.zendesk.com/api-reference/apps/apps-support-api/all_locations/), as well as in the comment of script [here](https://github.com/OlegGulevskyy/zendesk-vite-boilerplate/blob/02b74dd1f87dcb1f2249f534425c5813d740d993/scripts/build.mjs#L20) .

## Roadmap

- [ ] Example of CI/CD using zcli
- [ ] Some more examples using different frameworks

Let me know if you think there is should be something else.

## Issues / Contribution

If you do have an issue / question / problem - do not hesitate to raise an issue.
I am planning to update this repository more I use and create Zendesk apps. I am using it for my own needs to start faster on some of the freelance projects.
If you feel like you need further help or my services in developing Zendesk application - feel free to shot an email - oleggulevskyy@gmail.com
