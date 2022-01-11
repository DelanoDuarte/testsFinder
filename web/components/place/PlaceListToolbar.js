import { Download, Search, Upload } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const PlaceListToolbar = ({ onAddPlace }) => (
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
        Places
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button disabled startIcon={<Upload fontSize="small" />} sx={{ mr: 1 }}>
          Import
        </Button>
        <Button
          disabled
          startIcon={<Download fontSize="small" />}
          sx={{ mr: 1 }}
        >
          Export
        </Button>
        <Button color="primary" variant="contained" onClick={onAddPlace}>
          Add Place
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              placeholder="Search Place"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default PlaceListToolbar;
