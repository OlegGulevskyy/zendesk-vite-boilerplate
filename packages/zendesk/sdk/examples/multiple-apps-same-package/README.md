## Multiple applications have the same package as source

This `manifest.json` gives an example of how to have multiple Support applications, using the same `package/` as source.
It allows to not copy paste packages and develop application from the same codebase.
Be careful to handle the Zendesk SDK's differences for different applications.

### Properties

In the example `manifest.json` you can see some properties added, that are not expected by Zendesk SDK:
- `dev:url` - specify your own localhost or something else
- `dev:port` - specify the port where your application is running

This way you can have multiple UI frameworks working at the same time for different application locations.
