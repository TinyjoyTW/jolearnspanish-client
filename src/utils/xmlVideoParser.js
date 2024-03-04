export const parseYouTubeVideosFromXML = (data) =>
  data.elements[0].elements
    .filter((v) => v.name === "entry")
    .map((v) => {
      return v.elements.reduce((acc, vInner) => {
        return {
          ...acc,
          [vInner.name]:
            vInner.elements?.[0]?.text || vInner.attributes?.href || "",
          thumbnail:
            vInner.name === "media:group"
              ? vInner.elements.find((m) => m.name === "media:thumbnail")
                  .attributes.url
              : undefined,
          description:
            vInner.name === "media:group"
              ? vInner.elements.find((m) => m.name === "media:description")
                  .elements[0].text
              : undefined,
        };
      }, {});
    });
