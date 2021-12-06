import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/system/Box";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";

export default styled(Box)({
  backgroundImage: `url(${getSingleAssetSrc("BorderedBox").default})`,
  backgroundSize: "100% 100%",
});

// export default function BorderedBox(props: BoxProps) {
//   const { sx, children, ...other } = props;
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         ...(sx || {}),
//       }}
//       {...other}
//     >
//       <Box
//         component="img"
//         src={getSingleAssetSrc("BorderedBox").default}
//         alt="Background"
//         sx={{ position: "absolute", width: "100%", height: "100%" }}
//       />
//       {children}
//     </Box>
//   );
// }
