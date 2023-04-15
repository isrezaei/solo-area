import { Html, Head, Main, NextScript  } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/*<meta name='viewport' content='minimum-scale=0, initial-scale=0, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>*/}
                <meta name="application-name" content="Solo Area" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Solo Area" />
                <meta name="description" content="Start listen with me !" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />


                <link rel="apple-touch-icon" href="/icon-384x384.png" />
                <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
                <link rel="apple-touch-icon" sizes="256x256" href="/icon-256x256.png" />
                <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png" />

                <link rel="icon" type="image/png" sizes="32x32" href="/icon-512x512.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icon-192x192.png" />

                <link rel="manifest" href="/manifest.json" />

                <title>solo area</title>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}