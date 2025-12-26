export const GET_FOOTER = `
  query footerQuery($type: String) {
    themeCustomizations(type: $type) {
      edges {
        node {
          id
          type
          name
          status
          themeCode
          translations {
            edges {
              node {
                id
                themeCustomizationId
                locale
                options
              }
            }
          }
        }
      }
    }
  }
`;
