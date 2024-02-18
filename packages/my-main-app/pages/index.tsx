import { Button, Group } from "@mantine/core";
import { DummyComponent } from "../components/dummy-component";

export default function IndexPage() {
  return (
    <Group mt={50} position="center">
      <Button size="xl">Welcome to Mantine!</Button>
      <DummyComponent />
    </Group>
  );
}
