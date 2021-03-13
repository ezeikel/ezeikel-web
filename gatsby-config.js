require("dotenv").config();
const path = require(`path`);

const sentryConfig = {
  dsn: process.env.SENTRY_DSN,
  // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
  environment: process.env.NODE_ENV,
  enabled: (() =>
    ["production", "staging"].indexOf(process.env.CUSTOM_NODE_ENV) !== -1)(),
};

const hotjarConfig = {
  id: process.env.HOTJAR_ID,
  sv: 6,
};

const typekitConfig = {
  typekit: {
    id: process.env.TYPEKIT_ID,
  },
};

const googleAnalyticsConfig = {
  trackingId: process.env.GA_TRACKING_ID,
  head: true,
  // TODO: find out if this is required due to any privacy laws
  // anonymize: true,
  // respectDNT: true,
  pageTransitionDelay: 0,
};

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  host:
    process.env.CUSTOM_NODE_ENV === "production"
      ? "cdn.contentful.com"
      : "preview.contentful.com",
  accessToken:
    process.env.CUSTOM_NODE_ENV === "production"
      ? process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
      : process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}

module.exports = {
  siteMetadata: {
    title: `Ezeikel - Software Engineer`,
    description: ``,
    author: `@ezeikel`,
    siteUrl: `https://ezeikel.dev`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [process.env.GA_MEASUREMENT_ID],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        // gtagConfig: {
        //   optimize_id: "OPT_CONTAINER_ID",
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          // respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: googleAnalyticsConfig,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-reading-time`],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/sunglasses.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: typekitConfig,
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: googleAnalyticsConfig,
    },
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-hotjar`,
      options: hotjarConfig,
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://mynextlayer.us20.list-manage.com/subscribe/post?u=27cabe4e6eb1deee12ba4dc5d&amp;id=790324b928",
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: "gatsby-plugin-sentry",
      options: sentryConfig,
    },
    `gatsby-remark-reading-time`,
  ],
};
