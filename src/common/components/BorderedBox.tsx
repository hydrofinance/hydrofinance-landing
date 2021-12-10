import { styled } from "@mui/material/styles";
import Box from "@mui/system/Box";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";

export default styled(Box)({
  backgroundImage: `url(${getSingleAssetSrc("BorderedBox").default})`,
  backgroundSize: "100% 100%",
});
