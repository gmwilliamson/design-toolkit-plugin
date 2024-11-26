import {
  once,
  setRelaunchButton,
  showUI,
} from "@create-figma-plugin/utilities";

import { CreatePageHandler } from "./types";

export default function () {
  setRelaunchButton(figma.currentPage, "designToolkit", {
    description: "Useful tools and links",
  });

  once<CreatePageHandler>("CREATE_PAGES", async function () {
    // This is the list of pages to create in your document.
    const pages = [
      {
        name: "-- 📔 cover --",
        node: "PAGE", 
      },
      {
        name: " ",
        node: "PAGE",
        isPageDivider: "true"
      },
      {
        name: "--  👾 ready-for-development  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
        isPageDivider: "true"
      },
      {
        name: "--  🧐 ready-for-review  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
        isPageDivider: "true"
      },
      {
        name: "--  🖌️ in-progress  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
        isPageDivider: "true"
      },
      {
        name: "--  🛑 parked  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
        isPageDivider: "true"
      },
      {
        name: "--  🔦 exploration  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
        isPageDivider: "true"
      },
      {
        name: "--  🎥 prototypes  --",
        node: "PAGE",
      },
      {
        name: " ",
        node: "PAGE",
        isPageDivider: "true"
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

    try {
      // Create all new pages first
      let createdPages: PageNode[] = [];
      for (const page of pages) {
        const newPage = figma.createPage();
        newPage.name = page.name;
        createdPages.push(newPage);
      }
      
      console.log("Pages built");

      // Find and switch to cover page first
      const coverPage = createdPages.find((page) => page.name === "-- 📔 cover --");
      if (!coverPage) {
        throw new Error("Cover page not found in created pages");
      }
      await figma.setCurrentPageAsync(coverPage);

      // Import and set up cover component
      const coverComponentKey = "9b9769be8f444037e00f8e6744467ae88c909aa7";
      let coverComponent: ComponentNode | null = null;
      
      try {
        const component = await figma.importComponentByKeyAsync(coverComponentKey);
        if (component && component.type === "COMPONENT") {
          coverComponent = component;
          console.log("Cover component imported successfully");
        } else {
          throw new Error("Invalid cover component type");
        }
      } catch (error) {
        console.error("Error importing cover component:", error);
        throw error;
      }

      if (coverComponent) {
        // Create frame
        const frame = figma.createFrame();
        frame.name = "cover";
        
        // Create instance and add to frame
        const coverInstance = coverComponent.createInstance();
        frame.appendChild(coverInstance);

        // Set instance position
        coverInstance.x = 0;
        coverInstance.y = 0;

        // Resize frame to match instance
        frame.resize(coverInstance.width, coverInstance.height);

        // Set viewport
        figma.viewport.scrollAndZoomIntoView([frame]);

        // Set thumbnail
        try {
          await figma.setFileThumbnailNodeAsync(frame);
          console.log("Thumbnail set successfully");
        } catch (error) {
          console.error("Error setting the file thumbnail:", error);
          throw error;
        }

        console.log("Cover inserted");
      }

      // Only remove the initial page after everything is properly set up
      const initialPage = figma.root.children[0];
      if (initialPage && initialPage !== coverPage) {
        initialPage.remove();
      }

      figma.closePlugin("Design Toolkit template applied");
    } catch (error) {
      console.error("Error building template:", error);
      figma.notify("Error building template");
    }
  });
  showUI({
    width: 320,
    height: 228,
  });
}