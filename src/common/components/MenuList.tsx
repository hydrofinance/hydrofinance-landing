import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useTranslation } from "react-i18next";
import { CONTACT_ITEMS } from "../utils";
import { ListItemIcon } from "@mui/material";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";

export default function MenuList(props: { isMobile: boolean }) {
  const { t } = useTranslation();
  const { isMobile } = props;

  return (
    <List sx={{ width: "100%", bgcolor: "#1F1F1Faa", p: 0 }}>
      {CONTACT_ITEMS.map((eachData) => (
        <ListItem sx={{ p: 0 }}>
          <ListItemButton
            component="a"
            target="_blank"
            sx={{ pr: 3, pl: 2 }}
            href={eachData.redirectTo}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <img
                src={getSingleAssetSrc(eachData.icon).default}
                alt={eachData.primaryText}
              />
            </ListItemIcon>
            <ListItemText
              primary={t(eachData.primaryText)}
              style={
                isMobile
                  ? {
                      flex: "0 1 auto",
                      minWidth: "82px",
                    }
                  : {}
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
