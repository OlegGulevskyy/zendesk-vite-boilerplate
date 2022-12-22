
## Server side app

Server side app means an application served as an iframe inside the location, instead of serving all the JS as bundle to Zendesk.
You can use this to control your own server environment and UI. Good example of this - using NextJS or NuxtJS

### How

All it takes is to create a package (name it whatever) and have a `zaf.config.json` file:

```
{
  "location": "new_ticket_sidebar", // has to be valid application location title, this will be verified by Zendesk
  "server_side": true, // indicates if the app is server side or not, set to false otherwise
  "production_url": "https://frontend-production-bc15.up.railway.app", // when the app is built - UI will be pointed to this URL
  "dev_url": "http://localhost", // when you run "npm run zcli:start" - this address will be used to listen for UI
  "dev_port": 3000 // same as above but for specifying port
}
```

property `server_side` is only used by this boilerplate during `npm run build` command, to determine if it should navigate inside the folder and build it or not
This would mean, that you build your Zendesk application separately and your UI (Nextjs in this case) separately, and redeploy it
