import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItemCard from "./MenuItemCard";

function MenuAccordion({ menu, expanded, onChange }) {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      disableGutters
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",

        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack>
          <Typography variant='h6' fontWeight={700}>
            {menu.name}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {menu.menuItems.length} Items
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={3}>
          {menu.menuItems.map((menuItem) => (
            <MenuItemCard key={menuItem.id} menuItem={menuItem} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default MenuAccordion;
