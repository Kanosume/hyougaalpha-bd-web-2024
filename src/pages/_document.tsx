import { Html, Head, Main, NextScript } from 'next/document';


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="title" content="HYOUGAALPHA's Birthday | 22 November" />
        <meta name="description" content="description" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />      
        <meta property="og:type" content="website" />
        <meta property="og:url" content="url" />
        <meta property="og:title" content="HYOUGAALPHA's Birthday | 22 November" />
        <meta property="og:description" content="เว็บไซด์สำหรับข่าวสารโปรเจ็กวันเกิด และ การอวยพรพรวันเกิดเฮียวกะอัลฟ่า Vtuber แห่งบ้าน ARP" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="url" />
        <meta property="twitter:title" content="HYOUGAALPHA's Birthday | 22 November" />
        <meta property="twitter:description" content="เว็บไซด์สำหรับข่าวสารโปรเจ็กวันเกิด และ การอวยพรพรวันเกิดเฮียวกะอัลฟ่า Vtuber แห่งบ้าน ARP" />

        <meta name="robots" content="all" />

        {/* Add the ngrok-skip-browser-warning meta tag here */}
        <meta http-equiv="ngrok-skip-browser-warning" content="true" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}


