// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";
import { getCurrentLocale } from "@/utils/locales.ts";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang={getCurrentLocale()}>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
