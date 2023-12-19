import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "main aside"`,
      }}
    >
      <GridItem area="nav" bg="coral">
        Nav
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
