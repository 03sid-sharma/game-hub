import { Grid, GridItem, Show } from "@chakra-ui/react";
import { NavBar } from "./components/NavBar";
function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "main aside"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="main" bg="gold">
        Main
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="dodgerblue">
          Aside
        </GridItem>
      </Show>
    </Grid>
  );
}

export default App;
