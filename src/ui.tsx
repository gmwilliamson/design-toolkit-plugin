import {
  Banner,
  Button,
  Container,
  Divider,
  Inline,
  IconMegaphone32,
  render,
  Stack,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from 'preact'
import { useCallback, useState } from "preact/hooks";

import { CreatePageHandler } from "./types";

function Plugin() {
  const handlePageButtonClick = useCallback(function () {
    emit<CreatePageHandler>("CREATE_PAGES");
  }, []);

  return (
    <Container style="padding: 0">
      <Banner icon={<IconMegaphone32 />}>
      Welcome to Qualio's Design Toolkit plugin!
    </Banner>
      <Container>
        <VerticalSpace space="large" />
        <Text bold>Automations</Text>
        <VerticalSpace space="medium" />
        <Button fullWidth onClick={handlePageButtonClick}>
          Setup design document
        </Button>
        <VerticalSpace space="large" />
      </Container>
      <Divider />
      <Container>
        <VerticalSpace space="large" />
        <Stack space="extraLarge">
          <Stack space="medium">
            <Text bold>Documentation</Text>
            <Inline space="medium">
              <Text>
                <a href="https://github.com/gmwilliamson/design-toolkit-plugin" target="_blank">
                  Github
                </a>
              </Text>
            </Inline>
          </Stack>{" "}
        </Stack>
      </Container>
    </Container>
  );
}

export default render(Plugin);
