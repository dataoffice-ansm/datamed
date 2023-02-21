export const faqQuery = `
   query getFAQ($entryId: String!) {
      websitefaq(id: $entryId) {
        title
        sectionsCollection(limit: 20) {
          items {
            title
            htmlId
            disabled
            sectionsCollection(limit: 20) {
              items {
                title
                htmlId
                disabled
                style
                bubbleColor
                entriesCollection(limit: 20) {
                  items {
                    title
                    disabled
                    content {
                      json
                    }
                    subContent {
                      json
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`;
