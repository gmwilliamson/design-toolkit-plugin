import {
  once,
  setRelaunchButton,
  showUI,
} from "@create-figma-plugin/utilities";

import { CreatePageHandler } from "./types";

export default async function () {
  setRelaunchButton(figma.currentPage, "designToolkit", {
    description: "Useful tools and links",
  });

  once<CreatePageHandler>("CREATE_PAGES", function () {
    // This is the list of pages to create in your document.
    const pages = [
      {
        name: "-- 📔 cover --",
        node: "PAGE", 
      },
      {
        name: "---------------------------------------------------------------",
        node: "PAGE",
      },
      {
        name: "--  🟢 shipped  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
      },
      {
        name: "--  🪲 bugs  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
      },
      {
        name: "--  👾 ready-for-development  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
      },
      {
        name: "--  🖌️ in-progress  --",
        node: "PAGE",
      },
      {
        name: "        ⮑  untitled-page",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
      },
      {
        name: "--  🛑 parked  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
      },
      {
        name: "--  🔦 exploration  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
      },
      {
        name: "--  🎥 prototypes  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
      },
      {
        name: "---------------------------------------------------------------",
        node: "PAGE",
      },
      {
        name: "--  🗂️ archive  --",
        node: "PAGE",
      },
      {
        name: "--  🛝 playground  --",
        node: "PAGE",
      },
      {
        name: "--  🧩 local-components  --",
        node: "PAGE",
      },
    ];

    // Show a notification

    figma.notify("Building template...", { timeout: Infinity });

    // Setup your components for import into pages

    // Cover component
    let coverComponent: ComponentNode | null = null;

    async function getCoverComponent() {
      const coverComponentKey = "9b9769be8f444037e00f8e6744467ae88c909aa7"; // Replace this with the Key for your cover component.
      const instance = await figma.importComponentByKeyAsync(coverComponentKey);
      coverComponent = instance;
    }

    // The following section is contained within a Promise, which means it only runs when the above components and fonts are available.

    Promise.all([
      getCoverComponent(),
    ]).then(() => {
      console.log("%Components loaded", "color:green");

      // This forEach loop goes through the list of pages and creates each one using the 'name' values.
      let createdPages: PageNode[] = []
      pages.forEach((page) => {
        const newPage = figma.createPage();
        newPage.name = page.name;
        if (newPage.name !== 'Cover') {
          figma.currentPage = newPage;
        }
        createdPages.push(newPage) // Inserts the heading component from library if there is a "title" value in your pages array.
      });

      console.log("%cPages built", "color:green");

      // Switch to page called "Cover"
      const coverPage = createdPages.filter((page) => page.name === "Cover")[0];
      figma.currentPage = coverPage;

      // Insert Cover component instance
      if (coverComponent) {
        const coverInstance: InstanceNode = coverComponent.createInstance();

        // Set the page to zoom to fit the cover instance
        figma.viewport.scrollAndZoomIntoView([coverInstance]);

        console.log("%cCover inserted", "color:green");
      }

      // Remove the initial 'Page 1' that isn't required any longer
      let initialPage = figma.root.children[0];
      initialPage.remove();

      figma.closePlugin("Design Toolkit template applied");
    });
  });
  showUI({
    width: 320,
    height: 320,
  });
}
