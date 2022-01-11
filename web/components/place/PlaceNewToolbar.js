import { ArrowBack } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

const PlaceNewToolbar = ({ title, onBack }) => {
  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          <IconButton color="primary" aria-label="back" onClick={onBack}>
            <ArrowBack />
          </IconButton>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlaceNewToolbar;
