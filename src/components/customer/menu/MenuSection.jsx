import { Stack } from "@mui/material";
import React, { useState } from "react";
import MenuAccordion from "./MenuAccordion";

function MenuSection({ menus }) {
  const [expandedMenu, setExpandedMenu] = useState(menus[0]?.id || null);

  return (
    <Stack sx={{ mt: 4 }} spacing={2}>
      {menus.map((menu, index) => (
        <MenuAccordion
          key={menu.id}
          menu={menu}
          expanded={expandedMenu === menu.id}
          onChange={(event, expanded) =>
            setExpandedMenu(expanded ? menu.id : null)
          }
        />
      ))}
    </Stack>
  );
}

export default MenuSection;
