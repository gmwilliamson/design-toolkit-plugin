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
      try {
        const instance = await figma.importComponentByKeyAsync(coverComponentKey);
        if (instance && instance.type === "COMPONENT") {
          coverComponent = instance as ComponentNode;
          console.log("Cover component set successfully");
        } else {
          console.error("Cover component not found or invalid type");
        }
      } catch (error) {
        console.error("Error importing cover component:", error);
      }  
    }

    try {
      await getCoverComponent();
      console.log("%Components loaded", "color:green");
  
      // This forEach loop goes through the list of pages and creates each one using the 'name' values.
      let createdPages: PageNode[] = [];
      pages.forEach((page) => {
        const newPage = figma.createPage();
        newPage.name = page.name;
        createdPages.push(newPage);
      });
  
      console.log("%cPages built", "color:green");
  
      // Switch to page called "Cover"
      const coverPage = createdPages.filter((page) => page.name === "-- 📔 cover --")[0];
      figma.currentPage = coverPage;
          
      // Insert Cover component instance
      if (coverComponent) {
        const coverInstance : InstanceNode = (coverComponent as ComponentNode).createInstance();
        // Set the page to zoom to fit the cover instance
        figma.viewport.scrollAndZoomIntoView([coverInstance]);
        const frame = figma.createFrame();
        frame.resize(coverInstance.width, coverInstance.height);
        frame.name = "cover";
        frame.appendChild(coverInstance);
        coverInstance.x = 0;
        coverInstance.y = 0;
        try {
          await figma.setFileThumbnailNodeAsync(frame);
          console.log ("%cThumbnail set successfully", "color:green");
        } catch (error) {
          console.error("Error setting the file thumbnail:", error);  
        }
        console.log("%cCover inserted", "color:green");
      } else {
        console.error ("Cover component not found");
      }
      
      // Remove the initial 'Page 1' that isn't required any longer
      //let initialPage = figma.root.children[0];
      //if (initialPage.name === 'Page 1') {
      //  initialPage.remove();
      //}
  
      figma.closePlugin("Design Toolkit template applied");
    } catch (error) {
      console.error("Error building template:", error);
      figma.notify("Error building template");
    }
  });
  showUI({
    width: 320,
    height: 320,
  });
}
