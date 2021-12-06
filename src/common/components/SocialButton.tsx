import React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import MenuList from "./MenuList";
import { useTranslation } from "react-i18next";
import { Hidden, IconButton } from "@mui/material";
import MenuIcon from "../../assets/Menu.svg";

export default function MoreMenu() {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Hidden mdDown>
        <Button
          variant="text"
          color="secondary"
          onMouseOver={handleClick}
          sx={{ width: "155px", fontSize: 16 }}
        >
          {t("social")}
        </Button>
      </Hidden>
      <Hidden mdUp>
        <IconButton onClick={handleClick}>
          <img src={MenuIcon} alt="Social Menu"/>
        </IconButton>
      </Hidden>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={{ top: "8px" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <div onMouseLeave={handleClose}>
          <MenuList isMobile={false} />
        </div>
      </Popover>
    </>
  );
}
